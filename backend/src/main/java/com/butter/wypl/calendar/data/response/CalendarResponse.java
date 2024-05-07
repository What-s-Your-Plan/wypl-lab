package com.butter.wypl.calendar.data.response;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public record CalendarResponse(

	@JsonProperty("schedule_count")
	int scheduleCount,

	@JsonProperty("schedules")
	List<CalendarScheduleResponse> schedules
) {
}
