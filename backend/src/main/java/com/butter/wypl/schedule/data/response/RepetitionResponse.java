package com.butter.wypl.schedule.data.response;

import java.time.LocalDateTime;

import com.butter.wypl.schedule.domain.embedded.RepetitionCycle;

public record RepetitionResponse(
	RepetitionCycle repetitionCycle,
	LocalDateTime startDate,
	LocalDateTime endDate,
	Byte dayOfWeek,
	int month,
	int week,
	int day,
	boolean lastDay
) {
}
