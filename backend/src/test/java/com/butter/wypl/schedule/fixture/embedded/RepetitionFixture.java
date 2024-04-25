package com.butter.wypl.schedule.fixture.embedded;

import java.time.LocalDateTime;
import java.util.Arrays;

import com.butter.wypl.schedule.domain.embedded.Repetition;
import com.butter.wypl.schedule.domain.embedded.RepetitionCycle;

public enum RepetitionFixture {
	MONDAY_REPETITION(
		RepetitionCycle.WEEK,
		LocalDateTime.of(2024,4,25,11, 16),
		LocalDateTime.of(2025, 4, 25, 11, 16),
		0,
		1,
		0,
		false,
		(byte)0b0100000
	),
	TUESDAY_THRUSDAY_REPETITION(
		RepetitionCycle.WEEK,
		LocalDateTime.of(2024,4,25,11, 16),
		null,
		0,
		2,
		0,
		false,
		(byte)0b0010100
	),
	MONTHLY_REPETITION(
		RepetitionCycle.MONTH,
		LocalDateTime.of(2024,4,25,11, 16),
		LocalDateTime.of(2025, 4, 25, 11, 16),
		0,
		0,
		13,
		false,
		(byte)0b0000000
	),
	LAST_DAY_REPETITION(
		RepetitionCycle.MONTH,
		LocalDateTime.of(2024,4,25,11, 16),
		LocalDateTime.of(2025, 4, 25, 11, 16),
		0,
		0,
		0,
		true,
		(byte)0b0000000
	),
	YEARLY_REPETITION(
		RepetitionCycle.YEAR,
		LocalDateTime.of(2024,4,25,11, 16),
		null,
		10,
		0,
		5,
		false,
		(byte)0b0000000
	),
	;

	private final RepetitionCycle repetitionCycle;

	private final LocalDateTime repetitionStartDate;

	private final LocalDateTime repetitionEndDate;

	private final int month;

	private final int week;

	private final int day;

	private final boolean lastDay;

	private final byte dayOfWeek;

	RepetitionFixture(RepetitionCycle repetitionCycle, LocalDateTime repetitionStartDate,
		LocalDateTime repetitionEndDate, int month, int week, int day, boolean lastDay, byte dayOfWeek) {
		this.repetitionCycle = repetitionCycle;
		this.repetitionStartDate = repetitionStartDate;
		this.repetitionEndDate = repetitionEndDate;
		this.month = month;
		this.week = week;
		this.day = day;
		this.lastDay = lastDay;
		this.dayOfWeek = dayOfWeek;
	}

	public Repetition toRepetition(){
		return Repetition.builder()
			.repetitionCycle(repetitionCycle)
			.repetitionStartDate(repetitionStartDate)
			.repetitionEndDate(repetitionEndDate)
			.month(month)
			.week(week)
			.day(day)
			.lastDay(lastDay)
			.dayOfWeek(dayOfWeek)
			.build();
	}

}
