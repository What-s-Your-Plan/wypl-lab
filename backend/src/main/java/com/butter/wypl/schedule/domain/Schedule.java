package com.butter.wypl.schedule.domain;

import java.time.LocalDateTime;

import com.butter.wypl.global.common.BaseEntity;
import com.butter.wypl.label.domain.Label;
import com.butter.wypl.schedule.domain.embedded.Repetition;

import jakarta.persistence.Column;
import jakarta.persistence.Embedded;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
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
public class Schedule extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "schedule_id")
	private int scheduleId;

	@Column(nullable = false, length = 50)
	private String title;

	private String description;

	@Enumerated(EnumType.STRING)
	@Column(nullable = false)
	private Category category;

	@Column(name = "owner_id", nullable = false)
	private int ownerId;

	@Column(name = "start_date", nullable = false)
	private LocalDateTime startDate;

	@Column(name = "end_date", nullable = false)
	private LocalDateTime endDate;

	@Column(name = "repeat_schedule_id")
	private Integer repeatScheduleId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "label_id")
	private Label label;

	@Embedded
	private Repetition repetition;

	public void updateLabel(Label label) {
		this.label = label;
	}

	public void updateRepetition(Repetition repetition) {
		this.repeatScheduleId = this.scheduleId;
		this.repetition = repetition;
	}

	public Schedule toRepetitionSchedule(LocalDateTime startDate, LocalDateTime endDate) {
		return Schedule.builder()
			.title(title)
			.description(description)
			.startDate(startDate)
			.endDate(endDate)
			.category(category)
			.ownerId(ownerId)
			.label(label)
			.repeatScheduleId(repeatScheduleId)
			.build();
	}

}
