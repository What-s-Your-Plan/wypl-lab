package com.butter.wypl.notification.domain;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class NotificationButton {
	private String text;
	private String actionUrl;
	private String color;
	private String logo; // 버튼 로고정보
}
