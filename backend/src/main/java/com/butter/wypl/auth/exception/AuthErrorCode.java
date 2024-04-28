package com.butter.wypl.auth.exception;

import org.springframework.http.HttpStatus;

import com.butter.wypl.global.exception.ErrorCode;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum AuthErrorCode implements ErrorCode {
	NO_SUPPORT_PROVIDER(HttpStatus.BAD_REQUEST, "AUTH_001", "지원하지 않는 소셜로그인 형식입니다."),
	NOT_AUTHORIZATION_MEMBER(HttpStatus.UNAUTHORIZED, "AUTH_002", "로그인이 필요한 기능입니다."),
	;

	private final HttpStatus httpStatus;
	private final String errorCode;
	private final String message;

	public int getStatusCode() {
		return httpStatus.value();
	}
}
