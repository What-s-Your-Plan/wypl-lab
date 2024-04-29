package com.butter.wypl.member.exception;

import org.springframework.http.HttpStatus;

import com.butter.wypl.global.exception.ErrorCode;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum MemberErrorCode implements ErrorCode {
	TOO_LONG_CONTENT(HttpStatus.BAD_REQUEST, "MEMBER_001", "내용이 너무 깁니다."),
	NOT_EXIST_MEMBER(HttpStatus.BAD_REQUEST, "MEMBER_002", "존재하지 않는 사용자입니다."),
	TOO_LONG_NICKNAME(HttpStatus.BAD_REQUEST, "MEMBER_003", "닉네임이 20자를 초과합니다."),
	NICKNAME_IS_NOT_BLANK(HttpStatus.BAD_REQUEST, "MEMBER_004", "닉네임을 입력하시지 않았습니다."),
	BIRTHDAYS_CANNOT_BE_IN_THE_FUTURE(HttpStatus.BAD_REQUEST, "MEMBER_005", "생일은 미래가 될 수 없습니다."),
	;

	private final HttpStatus httpStatus;
	private final String errorCode;
	private final String message;

	public int getStatusCode() {
		return httpStatus.value();
	}
}
