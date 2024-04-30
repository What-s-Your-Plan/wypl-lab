package com.butter.wypl.schedule.fixture;

import java.time.LocalDateTime;
import java.time.LocalTime;

import com.butter.wypl.label.domain.Label;
import com.butter.wypl.label.fixture.LabelFixture;
import com.butter.wypl.schedule.domain.Category;
import com.butter.wypl.schedule.domain.Schedule;
import com.butter.wypl.schedule.domain.embedded.Repetition;
import com.butter.wypl.schedule.fixture.embedded.RepetitionFixture;

import lombok.Getter;

@Getter
public enum ScheduleFixture {

	//반복이 없는 개인 스케줄
	PERSONAL_EXERCISE_SCHEDULE(
		"테니스 가기",
		"장소 : 신촌 테니스",
		LocalDateTime.of(2024, 04,26, 11, 0),
		LocalDateTime.of(2024, 04,26, 13, 0),
		null,
		LabelFixture.EXERCISE_LABEL.toLabel(),
		null,
		Category.MEMBER,
		0
	),
	//반복 있는 개인 스케줄
	PERSONAL_REPEAT_EXERCISE_SCHEDULE(
		"헬스장 가기",
		null,
		LocalDateTime.of(2024, 04,27, 11, 0),
		LocalDateTime.of(2024, 04,27, 12, 0),
		LocalTime.of(10, 50),
		LabelFixture.EXERCISE_LABEL.toLabel(),
		RepetitionFixture.MONDAY_REPETITION.toRepetition(),
		Category.MEMBER,
		0
	),
	//라벨 없는 반복 있는 개인 스케줄
	PERSONAL_REPEAT_NO_LABEL_SCHEDULE(
		"소연이 생일",
		"생일 파티 할 사람?",
		LocalDateTime.of(2024, 10,5, 0, 0),
		LocalDateTime.of(2024,10,5,23,59),
		LocalTime.of(0,0),
		null,
		RepetitionFixture.YEARLY_REPETITION.toRepetition(),
		Category.MEMBER,
		0
	),
	//그룹 스케줄
	GROUP_SCHEDULE(
		"알고르즘 스터디",
		"하루에 한문제씩 풀기",
		LocalDateTime.of(2024, 04,27, 11, 0),
		LocalDateTime.of(2024, 04,27, 12, 0),
		LocalTime.of(17,55),
		null,
		RepetitionFixture.MONDAY_REPETITION.toRepetition(),
		Category.GROUP,
		1
	)
	;

	private final String title;

	private final String description;

	private final LocalDateTime startDate;

	private final LocalDateTime endDate;

	private final LocalTime alarmTime;

	private final Label label;

	private final Repetition repetition;

	private final Category category;

	private final int groupId;

	ScheduleFixture(String title, String description, LocalDateTime startDate, LocalDateTime endDate,
		LocalTime alarmTime,  Label label, Repetition repetition, Category category, int groupId) {
		this.title = title;
		this.category = category;
		this.groupId = groupId;
		this.description = description;
		this.startDate = startDate;
		this.endDate = endDate;
		this.alarmTime = alarmTime;
		this.label = label;
		this.repetition = repetition;
	}

	public Schedule toSchedule(){
		return Schedule.builder()
			.title(title)
			.description(description)
			.startDate(startDate)
			.endDate(endDate)
			.alarmTime(alarmTime)
			.label(label)
			.repetition(repetition)
			.build();
	}
}
