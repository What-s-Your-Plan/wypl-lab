package com.butter.wypl.todo.exception;

import org.springframework.http.HttpStatus;

import com.butter.wypl.global.exception.ErrorCode;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum TodoErrorCode implements ErrorCode {
	NOT_EXIST_TODO(HttpStatus.BAD_REQUEST, "TODO_001", "TODO가 존재하지 않습니다."),
	TODO_AUTHOR_DIFFERENT(HttpStatus.BAD_REQUEST, "TODO_002", "현재 로그인된 회원과 TODO 작성자 정보가 다릅니다.");

	private final HttpStatus httpStatus;
	private final String errorCode;
	private final String message;

	@Override
	public int getStatusCode() {
		return httpStatus.value();
	}
}
