package com.butter.wypl.group.exception;

import org.springframework.http.HttpStatus;

import com.butter.wypl.global.exception.ErrorCode;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
public enum GroupErrorCode implements ErrorCode {

	FAIL_TO_CREATE_GROUP(HttpStatus.BAD_REQUEST, "GROUP_001", "그룹 생성에 실패하였습니다."),
	EXCEED_MAX_MEMBER_COUNT(HttpStatus.BAD_REQUEST, "GROUP_002", "그룹에 속한 멤버는 최대 50명까지 가능합니다."),
	NOT_APPROPRIATE_TYPE_OF_GROUP_NAME(HttpStatus.BAD_REQUEST, "GROUP_003", "그룹 이름은 필수이며, 최대 20자까지 가능합니다."),
	EXCEED_MAX_LENGTH_OF_GROUP_DESCRIPTION(HttpStatus.BAD_REQUEST, "GROUP_004", "그룹 설명은 최대 50자까지 가능합니다."),
	NOT_EXIST_GROUP(HttpStatus.NOT_FOUND, "GROUP_005", "존재하지 않는 그룹입니다."),
	IS_NOT_GROUP_MEMBER(HttpStatus.FORBIDDEN, "GROUP_006", "그룹 멤버가 아닙니다."),
	;
	private final HttpStatus httpStatus;
	private final String errorCode;
	private final String message;

	@Override
	public int getStatusCode() {
		return httpStatus.value();
	}
}
