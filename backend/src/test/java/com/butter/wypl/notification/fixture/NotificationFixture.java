package com.butter.wypl.notification.fixture;

import java.util.List;

import com.butter.wypl.notification.data.NotificationTypeCode;
import com.butter.wypl.notification.data.request.NotificationCreateRequest;
import com.butter.wypl.notification.domain.Notification;
import com.butter.wypl.notification.domain.NotificationButton;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum NotificationFixture {
	REVIEW_NOTI(1, "모코코님 운동 일정은 어떠셨나요?", false,
		List.of(ButtonFixture.ACCEPT.toNotificationButton(), ButtonFixture.CANCEL.toNotificationButton()),
		NotificationTypeCode.REVIEW),
	REVIEW_READ_NOTI(1, "모코코님 운동 일정은 어떠셨나요?", true,
		List.of(ButtonFixture.ACCEPT.toNotificationButton(), ButtonFixture.CANCEL.toNotificationButton()),
		NotificationTypeCode.REVIEW),
	GROUP_NOTI(1, "A602 팀 초대가 왔어요", true, List.of(ButtonFixture.REVIEW.toNotificationButton()),
		NotificationTypeCode.GROUP);

	private final int memberId;
	private final String message;
	private final boolean isRead;
	private final List<NotificationButton> buttons;
	private final NotificationTypeCode typeCode;

	public Notification toNotification() {
		return Notification.builder()
			.memberId(memberId)
			.message(message)
			.isRead(isRead)
			.typeCode(typeCode)
			.buttons(buttons)
			.build();
	}

	public NotificationCreateRequest toNotificationCreateRequest() {
		return new NotificationCreateRequest(memberId, "하이", "일정", "A602", typeCode);
	}

	@AllArgsConstructor
	private enum ButtonFixture {
		ACCEPT("수락", "수락URL", "초록", "Accept"),
		CANCEL("취소", "취소URL", "회색", "Cancel"),
		REVIEW("회고록 작성하러 가기", "회고URL", "흰색", "Review");
		private final String text;
		private final String actionUrl;
		private final String color;
		private final String logo; // 버튼 로고정보

		public NotificationButton toNotificationButton() {
			return NotificationButton.builder()
				.text(text)
				.actionUrl(actionUrl)
				.color(color)
				.logo(logo)
				.build();
		}
	}

}
