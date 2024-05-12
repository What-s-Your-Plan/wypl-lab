package com.butter.wypl.global.exception;

import org.springframework.http.HttpStatus;

import lombok.Getter;

@Getter
public class GlobalException extends RuntimeException {
	private final HttpStatus httpStatus;
	private final int statusCode;
	private final String message;

	public GlobalException(
			final HttpStatus httpStatus,
			final int statusCode,
			final String message
	) {
		this.httpStatus = httpStatus;
		this.statusCode = statusCode;
		this.message = message;
	}
}
