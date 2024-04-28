package com.butter.wypl.schedule.data.request;

import java.time.LocalDateTime;

import com.butter.wypl.schedule.domain.embedded.RepetitionCycle;

public record RepetitionRequest(
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
