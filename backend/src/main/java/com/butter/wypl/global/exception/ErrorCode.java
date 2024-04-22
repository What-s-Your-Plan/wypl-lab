package com.butter.wypl.global.exception;

import org.springframework.http.HttpStatusCode;

public interface ErrorCode {
	HttpStatusCode getHttpStatus();

	String getErrorCode();

	String getMessage();

	int getStatusCode();
}
