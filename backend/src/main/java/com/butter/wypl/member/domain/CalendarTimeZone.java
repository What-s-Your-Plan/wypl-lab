package com.butter.wypl.member.domain;

import java.util.TimeZone;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public enum CalendarTimeZone {
	KOREA(TimeZone.getTimeZone("Asia/Korea")),
	WEST_USA(TimeZone.getTimeZone("America/Los_Angeles")),
	EAST_USA(TimeZone.getTimeZone("America/New_York")),
	ENGLAND(TimeZone.getTimeZone("Europe/London"));

	private final TimeZone timeZone;
}
