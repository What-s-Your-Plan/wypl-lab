package com.butter.wypl.notification.domain;

import com.butter.wypl.notification.data.ButtonInfo;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@ToString
public class NotificationButton {
	private String text;
	private String actionUrl;
	private String color;
	private String logo; // 버튼 로고정보

	public static NotificationButton of(
		final ButtonInfo buttonInfo,
		final String actionUrl
	) {
		return NotificationButton.builder()
			.text(buttonInfo.getText())
			.actionUrl(actionUrl)
			.color(buttonInfo.getColor())
			.logo(buttonInfo.getLogo())
			.build();
	}
}
