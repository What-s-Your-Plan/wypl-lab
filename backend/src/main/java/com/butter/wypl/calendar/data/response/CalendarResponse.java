package com.butter.wypl.calendar.data.response;

import java.time.LocalDateTime;

import com.butter.wypl.label.data.response.LabelResponse;
import com.butter.wypl.schedule.domain.Category;
import com.butter.wypl.schedule.domain.Schedule;
import com.fasterxml.jackson.annotation.JsonProperty;

public record CalendarResponse(
	@JsonProperty("schedule_id")
	int scheduleId,

	String title,

	Category category,

	@JsonProperty("start_date")
	LocalDateTime startDate,

	@JsonProperty("end_date")
	LocalDateTime endDate,

	LabelResponse label

	//TODO : 그룹 일시 그룹 정보 추가
) {

	public static CalendarResponse from(Schedule schedule) {
		return new CalendarResponse(
			schedule.getScheduleId(),
			schedule.getTitle(),
			schedule.getCategory(),
			schedule.getStartDate(),
			schedule.getEndDate(),
			LabelResponse.from(schedule.getLabel())
		);
	}
}
