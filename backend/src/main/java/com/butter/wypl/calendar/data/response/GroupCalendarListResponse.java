package com.butter.wypl.calendar.data.response;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public record GroupCalendarListResponse(
	//TODO : 그룹 정보 넣기

	@JsonProperty("schedule_count")
	int scheduleCount,

	List<GroupCalendarResponse> schedules
) {

	public static GroupCalendarListResponse from(List<GroupCalendarResponse> groupCalendarResponses) {
		return new GroupCalendarListResponse(
			groupCalendarResponses.size(),
			groupCalendarResponses
		);
	}

}
