package com.butter.wypl.global.config;

import lombok.Getter;

@Getter
public enum OS {
	MAC("Mac"),
	WINDOWS("Windows 10"),
	LINUX("Linux"),
	;

	private final String value;

	OS(String value) {
		this.value = value;
	}
}
