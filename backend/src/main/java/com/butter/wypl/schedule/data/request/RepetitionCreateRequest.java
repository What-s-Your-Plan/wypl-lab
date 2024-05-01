package com.butter.wypl.schedule.data.request;

import java.time.LocalDate;

import com.butter.wypl.schedule.domain.embedded.Repetition;
import com.butter.wypl.schedule.domain.embedded.RepetitionCycle;
import com.fasterxml.jackson.annotation.JsonProperty;

public record RepetitionCreateRequest(
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
			.repetitionCycle(repetitionCycle)
			.repetitionStartDate(repetitionStartDate)
			.repetitionEndDate(repetitionEndDate)
			.dayOfWeek(dayOfWeek)
			.week(week)
			.build();
	}

	public static RepetitionCreateRequest from(Repetition repetition) {
		if (repetition == null)
			return null;

		return new RepetitionCreateRequest(
			repetition.getRepetitionCycle(),
			repetition.getRepetitionStartDate(),
			repetition.getRepetitionEndDate(),
			repetition.getDayOfWeek(),
			repetition.getWeek()
		);
	}
}
