package com.butter.wypl.notification.service;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

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

	public static final int PAGE_SIZE = 10;

	private final NotificationRepository notificationRepository;
	private final EmitterModifyService emitterModifyService;

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
		int memberId = notificationCreateRequest.memberId();
		String eventId = memberId + "_" + System.currentTimeMillis();
		Map<String, SseEmitter> emitters = emitterRepository.findAllEmitterStartWithByMemberId(
			String.valueOf(memberId));

		if (notificationCreateRequest.typeCode().equals(NotificationTypeCode.GROUP)) {
			log.info("GROUP 생성");
			Notification groupNotification = createGroupNotification(notificationCreateRequest);
			emitters.forEach(
				(key, emitter) -> {
					emitterRepository.saveEventCache(eventId, groupNotification);
					emitterModifyService.sendEmitter(emitter, eventId, key, groupNotification);
				}
			);
			return;

		} else if (notificationCreateRequest.typeCode().equals(NotificationTypeCode.REVIEW)) {
			log.info("REVIEW 생성");
			Notification reviewNotification = createReviewNotification(notificationCreateRequest);
			emitters.forEach(
				(key, emitter) -> {
					emitterRepository.saveEventCache(eventId, reviewNotification);
					emitterModifyService.sendEmitter(emitter, eventId, key, reviewNotification);
				}
			);
			return;
		}

		throw new IllegalStateException("알림 타입 코드가 없습니다");
	}

	@Override
	@Transactional
	public void deleteNotification(final int memberId) {
		notificationRepository.deleteByMemberId(memberId);
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
				return String.format("[%s] 그룹 초대가 왔어요.", teamName);
			}
			case REVIEW -> {
				// TODO 포맷 ->  "nickName"       , "일정"
				return String.format("%s님, [%s] 일정은 잘 마치셨나요?", nickname, scheduleTitle);
			}
			default -> throw new NotificationException(NotificationErrorCode.NOTIFICATION_TYPE_ERROR);
		}
	}

	@Override
	public NotificationPageResponse getNotifications(final int memberId, final String lastId) {
		PageRequest pageRequest = PageRequest.of(0, PAGE_SIZE);
		/*
		 * 1. 최초 조회시 (알림버튼 클릭) 회원 ID로 조회
		 * 2. 그 이후 조회시 no-offset 조회 마지막 행 알림 lastID 이용
		 * */
		Page<Notification> result;
		if (StringUtils.hasText(lastId)) {
			result = notificationRepository.findByMemberIdWithPage(memberId, pageRequest);
		} else {
			result = notificationRepository.findAllByLastId(memberId, lastId, pageRequest);
		}

		readNotification(memberId);
		return NotificationPageResponse.from(result);
	}

	/**
	 * 회원 알림 읽음 처리
	 *
	 * @param memberId 회원 ID
	 */
	@Transactional
	public void readNotification(final int memberId) {
		List<Notification> list = notificationRepository.findAllByMemberId(memberId);
		list.forEach(Notification::updateIsReadToTrue);
		notificationRepository.saveAll(list);
	}
}