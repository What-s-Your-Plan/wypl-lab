package com.butter.wypl.notification.domain;

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
}
