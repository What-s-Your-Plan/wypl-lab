package com.butter.wypl.schedule.domain;

import java.time.LocalDate;

import org.hibernate.annotations.SQLRestriction;

import com.butter.wypl.global.common.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Builder
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@SQLRestriction("deleted_at is null")
public class Repetition extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "repetition_id")
	private int repetitionId;

	@Column(name = "repetition_cycle")
	@Enumerated(EnumType.STRING)
	private RepetitionCycle repetitionCycle;

	@Column(name = "repetition_start_date")
	private LocalDate repetitionStartDate;

	@Column(name = "repetition_end_date")
	private LocalDate repetitionEndDate;

	private int week;

	@Column(name = "day_of_week", columnDefinition = "BINARY(7)")
	private byte dayOfWeek;

}
