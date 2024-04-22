package com.butter.wypl.global.exception;

import com.butter.wypl.global.common.StatusCode;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum ErrorCode {
	USER_NOT_FOUND(StatusCode.BAD_REQUEST.getCode(), "사용자를 찾을 수 없습니다.");

	private final int status;
	private final String message;
}
