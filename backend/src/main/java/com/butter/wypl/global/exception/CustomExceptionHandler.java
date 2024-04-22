package com.butter.wypl.global.exception;

import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.butter.wypl.global.common.Message;

@RestControllerAdvice
public class CustomExceptionHandler {
	@ExceptionHandler({CustomException.class})
	protected ResponseEntity<Message> handleCustomException(CustomException e) {
		return new ResponseEntity<Message>(new Message(e.getErrorCode().getMessage()),
			HttpStatusCode.valueOf(e.getErrorCode().getStatus()));
	}
}

