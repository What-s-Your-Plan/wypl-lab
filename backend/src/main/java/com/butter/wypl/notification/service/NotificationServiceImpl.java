package com.butter.wypl.notification.service;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.butter.wypl.notification.data.ButtonInfo;
import com.butter.wypl.notification.data.NotificationTypeCode;
import com.butter.wypl.notification.data.request.NotificationCreateRequest;
import com.butter.wypl.notification.data.response.NotificationPageResponse;
import com.butter.wypl.notification.data.response.NotificationResponse;
import com.butter.wypl.notification.domain.Notification;
import com.butter.wypl.notification.domain.NotificationButton;
import com.butter.wypl.notification.exception.NotificationErrorCode;
import com.butter.wypl.notification.exception.NotificationException;
import com.butter.wypl.notification.repository.EmitterRepository;
import com.butter.wypl.notification.repository.NotificationRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationModifyService, NotificationLoadService {

	private final static Long EMITTER_TIMEOUT = 30L * 1000 * 60;
	public static final int PAGE_SIZE = 10;

	private final NotificationRepository notificationRepository;
	private final EmitterRepository emitterRepository;

	private final static ButtonInfo[] acceptButtons = {ButtonInfo.ACCEPT, ButtonInfo.CANCEL};
	private final static ButtonInfo[] reviewButton = {ButtonInfo.REVIEW};

	@Override
	@Transactional
	public void createNotification(final NotificationCreateRequest notificationCreateRequest) {

		/*
		 * 1. 그룹 초대 알림
		 * 2. 리뷰 작성 알림
		 * */
		// if (notificationCreateRequest.typeCode() == NotificationTypeCode.GROUP) {
		// System.out.println("받은값 : " + notificationCreateRequest);
		log.info("받은값 : {}", notificationCreateRequest);
		if (notificationCreateRequest.typeCode().equals(NotificationTypeCode.GROUP)) {
			log.info("GROUP 생성");
			Notification groupNotification = createGroupNotification(notificationCreateRequest);
			sendEmitter(groupNotification);
			return;
			// } else if (notificationCreateRequest.typeCode() == NotificationTypeCode.REVIEW) {
		} else if (notificationCreateRequest.typeCode().equals(NotificationTypeCode.REVIEW)) {
			log.info("REVIEW 생성");
			Notification reviewNotification = createReviewNotification(notificationCreateRequest);
			sendEmitter(reviewNotification);
			return;
		}

		throw new IllegalStateException("알림 타입 코드가 없습니다");
	}

	@Override
	public SseEmitter subscribeNotification(final int memberId) {
		SseEmitter emitter = new SseEmitter(EMITTER_TIMEOUT);
		emitterRepository.save(memberId, emitter);

		sendEmitterInit(memberId, emitter);

		emitter.onCompletion(() -> emitterRepository.deleteByMemberId(memberId));
		emitter.onTimeout(() -> emitterRepository.deleteByMemberId(memberId));

		return emitter;
	}

	@Override
	@Transactional
	public void deleteNotification(final int memberId) {
		notificationRepository.deleteByMemberId(memberId);
	}

	private String makeSseEmitterId(final int memberId) {
		return memberId + "_" + System.currentTimeMillis();
	}

	private void sendEmitterInit(final int memberId, final SseEmitter emitter) {
		log.info("sendEmitterInit");
		try {
			emitter.send(
				SseEmitter.event()
					.id(makeSseEmitterId(memberId))
					.name("init")
					.data("최초 연결")
			);
		} catch (IOException e) {
			emitterRepository.deleteByMemberId(memberId);
			emitter.completeWithError(e);
		}
	}

	private void sendEmitter(final Notification notification) {
		NotificationResponse response = NotificationResponse.from(notification);

		emitterRepository.getByMemberId(response.memberId())
			.ifPresent(emitter -> {
				try {
					emitter.send(
						SseEmitter.event()
							.id(makeSseEmitterId(response.memberId()))
							.name("notification")
							.data(response)
					);
				} catch (IOException e) {
					emitterRepository.deleteByMemberId(response.memberId());
					emitter.completeWithError(e);
				}
			});
	}

	private Notification createGroupNotification(final NotificationCreateRequest request) {
		List<NotificationButton> buttons = getButtons(acceptButtons);

		Notification notification = Notification.builder()
			.memberId(request.memberId())
			.message(makeMessage(request.typeCode(), null, request.nickName(), null))
			.buttons(buttons)
			.isRead(false)
			.typeCode(request.typeCode())
			.build();

		return notificationRepository.save(notification);
	}

	private Notification createReviewNotification(final NotificationCreateRequest request) {
		List<NotificationButton> buttons = getButtons(reviewButton);

		Notification notification = Notification.builder()
			.memberId(request.memberId())
			.message(makeMessage(request.typeCode(), request.teamName(), request.nickName(), request.scheduleTitle()))
			.buttons(buttons)
			.isRead(false)
			.typeCode(request.typeCode())
			.build();

		return notificationRepository.save(notification);
	}

	private List<NotificationButton> getButtons(final ButtonInfo[] buttonInfos) {
		return Arrays.stream(buttonInfos)
			.map(info -> {
				switch (info) {
					case ACCEPT -> {
						return NotificationButton.of(info, "accept url");
					}
					case CANCEL -> {
						return NotificationButton.of(info, "cancel url");
					}
					case REVIEW -> {
						return NotificationButton.of(info, "review url");
					}
					default -> throw new NotificationException(NotificationErrorCode.NOTIFICATION_BUTTON_TYPE_ERROR);
				}
			}).toList();
	}

	/**
	 * 알림 메시지 내용 생성
	 *
	 * @param typeCode      : 알림 타입 (그룹, 회고 ...)
	 * @param nickname      : 회원 닉네임
	 * @param scheduleTitle : 일정 제목
	 * @return 생성된 알림 메시지
	 */
	private String makeMessage(
		final NotificationTypeCode typeCode,
		final String teamName,
		final String nickname,
		final String scheduleTitle
	) {
		/*
		 * message template
		 * 1. GROUP 초대: "[팀명]" 팀 그룹 초대가 왔어요.
		 * 2. 회고록 작성: [회원명]님, [일정명] 일정은 잘 마치셨나요?
		 * */
		switch (typeCode) {
			case GROUP -> {
				return String.format("[%s] 팀 그룹 초대가 왔어요.", teamName);
			}
			case REVIEW -> {
				return String.format("%s님, [%s] 일정은 잘 마치셨나요?", nickname, scheduleTitle);
			}
			default -> throw new NotificationException(NotificationErrorCode.NOTIFICATION_TYPE_ERROR);
		}
	}

	@Override
	public NotificationPageResponse getNotifications(int memberId, String lastId) {
		PageRequest pageRequest = PageRequest.of(0, PAGE_SIZE);
		/*
		 * 1. 최초 조회시 (알림버튼 클릭) 회원 ID로 조회
		 * 2. 그 이후 조회시 no-offset 조회 마지막 행 알림 lastID 이용
		 * */
		if (StringUtils.hasText(lastId)) {
			Page<Notification> result = notificationRepository.findAllByMemberId(memberId, pageRequest);
			return NotificationPageResponse.from(result);
		} else {
			Page<Notification> result = notificationRepository.findAllByLastId(memberId, lastId, pageRequest);
			return NotificationPageResponse.from(result);
		}
	}
}
