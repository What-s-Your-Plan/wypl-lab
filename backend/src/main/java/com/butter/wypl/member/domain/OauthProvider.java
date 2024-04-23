package com.butter.wypl.member.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum OauthProvider {
	GOOGLE("gmail.com");

	private final String domain;
}
