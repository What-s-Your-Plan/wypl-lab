package com.butter.wypl.schedule.data.request;

import java.time.LocalDateTime;
import java.util.List;

import com.butter.wypl.schedule.data.response.MemberIdResponse;
import com.butter.wypl.schedule.domain.Category;
import com.butter.wypl.schedule.domain.Schedule;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Builder;

@Builder
public record ScheduleRequest(
	//TODO : validation
	String title,
	String description,

	@JsonProperty("start_date")
	LocalDateTime startDate,

	@JsonProperty("end_date")
	LocalDateTime endDate,
	Category category,

	@JsonProperty("owner_id")
	int ownerId,

	RepetitionRequest repetition,

	@JsonProperty("label_id")
	Integer labelId,

	List<MemberIdResponse> members
) {

	public Schedule toEntity() {
		return Schedule.builder()
			.title(title)
			.description(description)
			.startDate(startDate)
			.endDate(endDate)
			.category(category)
			.ownerId(ownerId)
			.build();
	}
}
