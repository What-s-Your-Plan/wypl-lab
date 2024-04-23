package com.butter.wypl.global.exception.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.butter.wypl.global.common.Message;
import com.butter.wypl.global.exception.CustomException;
import com.butter.wypl.global.exception.GlobalErrorCode;

@RestControllerAdvice
public class CustomExceptionHandler {

	@ExceptionHandler(RuntimeException.class)
	protected ResponseEntity<Message<String>> internalErrorHandler(RuntimeException e) {
		GlobalErrorCode errorCode = GlobalErrorCode.INTERNAL_SERVER_ERROR;
		return ResponseEntity.status(errorCode.getStatusCode())
				.body(new Message<>(errorCode.getMessage()));
	}

	@ExceptionHandler({CustomException.class})
	protected ResponseEntity<Message<String>> customExceptionHandler(CustomException e) {
		return ResponseEntity.status(e.getHttpStatus())
				.body(new Message<>(e.getMessage()));
	}
}