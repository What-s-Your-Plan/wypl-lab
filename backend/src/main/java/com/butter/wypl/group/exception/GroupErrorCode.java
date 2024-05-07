package com.butter.wypl.group.exception;

import org.springframework.http.HttpStatus;

import com.butter.wypl.global.exception.ErrorCode;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum GroupErrorCode implements ErrorCode {

	FAIL_TO_CREATE_GROUP(HttpStatus.BAD_REQUEST, "GROUP_001", "그룹 생성에 실패하였습니다."),
	EXCEED_MAX_MEMBER_COUNT(HttpStatus.BAD_REQUEST, "GROUP_002", "그룹에 속한 멤버는 최대 50명까지 가능합니다.");
	private final HttpStatus httpStatus;
	private final String errorCode;
	private final String message;

	@Override
	public int getStatusCode() {
		return httpStatus.value();
	}
}
