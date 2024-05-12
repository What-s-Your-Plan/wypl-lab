package com.butter.wypl.global.exception;

import org.springframework.http.HttpStatus;

public class TooFewRequestSizeException extends GlobalException {
	public TooFewRequestSizeException() {
		super(
				HttpStatus.BAD_REQUEST,
				HttpStatus.BAD_REQUEST.value(),
				"데이터의 요청 건수가 0미만 입니다."
		);
	}
}
