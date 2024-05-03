package com.butter.wypl.notification.data;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum ButtonInfo {
	ACCEPT("수락", "초록", "accept"),
	CANCEL("거부", "회색","cancel"),
	REVIEW("회고록 작성하러 가기", "흰", "review");

	private final String text;
	private final String color;
	private final String logo;

}