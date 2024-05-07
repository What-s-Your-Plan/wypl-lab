package com.butter.wypl.notification.data.response;

import java.util.List;

import com.butter.wypl.notification.data.NotificationTypeCode;
import com.butter.wypl.notification.domain.Notification;
import com.fasterxml.jackson.annotation.JsonProperty;

public record NotificationResponse(
	@JsonProperty("id")
	String id,
	@JsonProperty("member_id")
	int memberId,
	@JsonProperty("message")
	String message,
	@JsonProperty("is_read")
	boolean isRead,
	@JsonProperty("buttons")
	List<ButtonResponse> buttons,
	@JsonProperty("type_code")
	NotificationTypeCode typeCode
) {

	record ButtonResponse(
		@JsonProperty("text")
		String text,
		@JsonProperty("action_url")
		String actionUrl,
		@JsonProperty("color")
		String color,
		@JsonProperty("logo")
		String logo
	) {

	}

	public static NotificationResponse from(Notification notification) {
		List<ButtonResponse> btnList = notification.getButtons().stream()
			.map(btn -> new ButtonResponse(btn.getText(), btn.getActionUrl(), btn.getColor(), btn.getLogo()))
			.toList();

		return new NotificationResponse(
			notification.getId(),
			notification.getMemberId(),
			notification.getMessage(),
			notification.getIsRead(),
			btnList,
			notification.getTypeCode()
		);
	}

	public static List<NotificationResponse> from(List<Notification> notifications) {
		return notifications.stream()
			.map(NotificationResponse::from)
			.toList();
	}
}
