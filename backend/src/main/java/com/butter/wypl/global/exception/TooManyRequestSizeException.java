package com.butter.wypl.global.exception;

import org.springframework.http.HttpStatus;

public class TooManyRequestSizeException extends GlobalException {
	public TooManyRequestSizeException() {
		super(
				HttpStatus.BAD_REQUEST,
				HttpStatus.BAD_REQUEST.value(),
				"데이터의 요청 건수가 너무 큽니다."
		);
	}
}
