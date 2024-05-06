package com.butter.wypl.schedule.data.response;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public record ScheduleListResponse(
	@JsonProperty("schedule_count")
	int scheduleCount,

	List<ScheduleDetailResponse> schedules
) {

	public static ScheduleListResponse from(List<ScheduleDetailResponse> scheduleDetailRespons) {
		return new ScheduleListResponse(scheduleDetailRespons.size(), scheduleDetailRespons);
	}
}
