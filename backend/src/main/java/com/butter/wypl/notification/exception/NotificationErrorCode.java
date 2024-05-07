package com.butter.wypl.notification.exception;

import org.springframework.http.HttpStatus;

import com.butter.wypl.global.exception.ErrorCode;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum NotificationErrorCode implements ErrorCode {
	NOTIFICATION_TYPE_ERROR(HttpStatus.BAD_REQUEST, "NOTIFICATION_001", "알림 타입 코드가 올바르지 않습니다."),
	NOTIFICATION_BUTTON_TYPE_ERROR(HttpStatus.BAD_REQUEST, "NOTIFICATION_002","알림 버튼 타입 코드가 올바르지 않습니다.");

	private final HttpStatus httpStatus;
	private final String errorCode;
	private final String message;

	@Override
	public int getStatusCode() {
		return httpStatus.value();
	}
}
