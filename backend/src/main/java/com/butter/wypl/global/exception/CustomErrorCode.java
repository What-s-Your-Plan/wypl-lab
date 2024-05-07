package com.butter.wypl.global.exception;

import org.springframework.http.HttpStatus;

import lombok.Getter;

@Getter
public record CustomErrorCode(
	HttpStatus httpStatus,
	String errorCode,
	String message

) implements ErrorCode {
	@Override
	public int getStatusCode() {
		return httpStatus.value();
	}
}
