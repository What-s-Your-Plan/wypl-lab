package com.butter.wypl.global.exception;

import org.springframework.http.HttpStatus;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum GlobalErrorCode implements ErrorCode {
	INTERNAL_SERVER_ERROR(HttpStatus.INTERNAL_SERVER_ERROR, "SERVER_001", "알 수 없는 서버의 오류입니다."),
	ALREADY_DELETED_ENTITY(HttpStatus.INTERNAL_SERVER_ERROR, "SERVER_002", "복구중 문제가 발생하였습니다."),
	NO_DELETED_ENTITY(HttpStatus.INTERNAL_SERVER_ERROR, "SERVER_003", "삭제중 문제가 발생하였습니다."),
	;

	private final HttpStatus httpStatus;
	private final String errorCode;
	private final String message;

	public int getStatusCode() {
		return httpStatus.value();
	}
}
