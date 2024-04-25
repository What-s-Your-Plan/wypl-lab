package com.butter.wypl.schedule.domain.embedded;

import java.time.LocalDateTime;

import org.hibernate.annotations.ColumnDefault;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Embeddable
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Builder
@AllArgsConstructor
public class Repetition {

	@Column(name = "repetition_cycle")
	@Enumerated(EnumType.STRING)
	private RepetitionCycle repetitionCycle;

	@Column(name = "repetition_start_date", nullable = false)
	private LocalDateTime repetitionStartDate;

	@Column(name = "repetition_end_date")
	private LocalDateTime repetitionEndDate;

	private int month;

	private int week;

	private int day;

	@ColumnDefault("false")
	@Column(name = "last_day", nullable = false, columnDefinition = "TINYINT(1)")
	private boolean lastDay;

	@Column(name = "day_of_week", columnDefinition = "BINARY(7)")
	private byte dayOfWeek;
}
