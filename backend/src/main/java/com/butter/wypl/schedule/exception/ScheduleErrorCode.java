package com.butter.wypl.schedule.exception;

import org.springframework.http.HttpStatus;

import com.butter.wypl.global.exception.ErrorCode;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum ScheduleErrorCode implements ErrorCode {
	NOT_APPROPRIATE_REPETITION_CYCLE(HttpStatus.BAD_REQUEST, "SCHEDULE_001", "반복 주기 입력이 잘못되었습니다."),
	NO_SCHEDULE(HttpStatus.BAD_REQUEST, "SCHEDULE_002", "해당 스케줄이 없습니다."),
	;
	private final HttpStatus httpStatus;
	private final String errorCode;
	private final String message;

	@Override
	public int getStatusCode() {
		return httpStatus.value();
	}
}

