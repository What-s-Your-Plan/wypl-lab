package com.butter.wypl.schedule.data.response;

import java.time.LocalDateTime;
import java.util.List;

import com.butter.wypl.schedule.domain.Category;
import com.butter.wypl.schedule.domain.Schedule;
import com.fasterxml.jackson.annotation.JsonProperty;

public record ScheduleResponse(

	@JsonProperty("schedule_id")
	int scheduleId,
	String title,
	String description,

	@JsonProperty("start_date")
	LocalDateTime startDate,

	@JsonProperty("end_date")
	LocalDateTime endDate,
	Category category,

	@JsonProperty("owner_id")
	int ownerId,

	@JsonProperty("repetition_schedule_id")
	Integer repetitionScheduleId,

	RepetitionResponse repetition,

	@JsonProperty("label_id")
	Integer labelId,

	@JsonProperty("member_count")
	int member_count,
	List<MemberResponse> members
) {

	public static ScheduleResponse from(
		Schedule schedule,
		List<MemberResponse> members
	) {
		return new ScheduleResponse(
			schedule.getScheduleId(),
			schedule.getTitle(),
			schedule.getDescription(),
			schedule.getStartDate(),
			schedule.getEndDate(),
			schedule.getCategory(),
			schedule.getOwnerId(),
			(schedule.getRepeatScheduleId() == null) ? null : schedule.getRepeatScheduleId(),
			(schedule.getRepetition() == null) ? null : RepetitionResponse.from(schedule.getRepetition()),
			(schedule.getLabel() == null) ? null : schedule.getLabel().getLabelId(),
			members.size(),
			members
		);
	}
}
