package com.butter.wypl.notification.service;

import java.util.Arrays;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.butter.wypl.notification.data.ButtonInfo;
import com.butter.wypl.notification.data.NotificationTypeCode;
import com.butter.wypl.notification.data.request.NotificationCreateRequest;
import com.butter.wypl.notification.domain.Notification;
import com.butter.wypl.notification.domain.NotificationButton;
import com.butter.wypl.notification.repository.NotificationRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class NotificationServiceImpl implements NotificationLoadService, NotificationModifyService {

	private final NotificationRepository notificationRepository;

	private final static ButtonInfo[] acceptButtons = {ButtonInfo.ACCEPT, ButtonInfo.CANCEL};
	private final static ButtonInfo[] reviewButton = {ButtonInfo.REVIEW};

	@Override
	@Transactional
	public Notification createNotification(final NotificationCreateRequest notificationCreateRequest) {
		/*
		 * 1. 그룹 초대 알림
		 * 2. 리뷰 작성 알림
		 * */
		if (notificationCreateRequest.typeCode() == NotificationTypeCode.GROUP) {
			log.info("GROUP 생성");
			return createGroupNotification(notificationCreateRequest);
		} else if (notificationCreateRequest.typeCode() == NotificationTypeCode.REVIEW) {
			log.info("REVIEW 생성");
			return createReviewNotification(notificationCreateRequest);
		}

		return null;
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
						return makeButton(info, "accept url");
					}
					case CANCEL -> {
						return makeButton(info, "cancel url");
					}
					case REVIEW -> {
						return makeButton(info, "review url");
					}
					//TODO 예외내용 수정
					default -> throw new IllegalStateException("Unexpected value: " + info);
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
			default -> throw new IllegalStateException("Unexpected value: " + typeCode);
		}
	}

	private NotificationButton makeButton(
		final ButtonInfo buttonInfo,
		final String actionURL
	) {
		return NotificationButton.builder()
			.text(buttonInfo.getText())
			.actionUrl(actionURL)
			.color(buttonInfo.getColor())
			.logo(buttonInfo.getLogo())
			.build();
	}
}
