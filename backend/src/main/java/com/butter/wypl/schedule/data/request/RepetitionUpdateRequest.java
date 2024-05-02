package com.butter.wypl.schedule.data.request;

import java.time.LocalDate;

import com.butter.wypl.schedule.data.ModificationType;
import com.butter.wypl.schedule.domain.Repetition;
import com.butter.wypl.schedule.domain.RepetitionCycle;
import com.fasterxml.jackson.annotation.JsonProperty;

public record RepetitionUpdateRequest(
	@JsonProperty("repetition_id")
	int repetitionId,

	@JsonProperty("modification_type")
	ModificationType modificationType,

	@JsonProperty("repetition_cycle")
	RepetitionCycle repetitionCycle,

	@JsonProperty("repetition_start_date")
	LocalDate repetitionStartDate,

	@JsonProperty("repetition_end_date")
	LocalDate repetitionEndDate,

	@JsonProperty("day_of_week")
	Byte dayOfWeek,
	Integer week

) {
	public Repetition toEntity() {
		return Repetition.builder()
			.repetitionId(repetitionId)
			.repetitionCycle(repetitionCycle)
			.repetitionStartDate(repetitionStartDate)
			.repetitionEndDate(repetitionEndDate)
			.dayOfWeek(dayOfWeek)
			.week(week)
			.build();
	}
}
