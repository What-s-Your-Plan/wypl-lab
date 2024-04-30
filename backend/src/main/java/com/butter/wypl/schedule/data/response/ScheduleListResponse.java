package com.butter.wypl.schedule.data.response;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public record ScheduleListResponse(
	@JsonProperty("schedule_count")
	int scheduleCount,

	List<ScheduleResponse> schedules
) {

	public static ScheduleListResponse from(List<ScheduleResponse> scheduleResponses) {
		return new ScheduleListResponse(scheduleResponses.size(), scheduleResponses);
	}
}
