package com.butter.wypl.notification.data.response;

import java.util.List;

import com.butter.wypl.notification.data.NotificationTypeCode;
import com.butter.wypl.notification.domain.Notification;

public record NotificationResponse(
	String id,
	int memberId,
	String message,
	boolean isRead,
	List<ButtonResponse> buttons,
	NotificationTypeCode typeCode
) {

	record ButtonResponse(
		String text,
		String actionUrl,
		String color,
		String logo
	) {

	}

	public static NotificationResponse of(Notification notification) {
		List<ButtonResponse> btnList = notification.getButtons().stream()
			.map(btn -> new ButtonResponse(btn.getText(), btn.getActionUrl(), btn.getColor(), btn.getLogo()))
			.toList();

		return new NotificationResponse(
			notification.getId(),
			notification.getMemberId(),
			notification.getMessage(),
			notification.isRead(),
			btnList,
			notification.getTypeCode()
		);
	}
}
