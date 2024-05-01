package com.butter.wypl.schedule.fixture;

import java.time.LocalDateTime;

import com.butter.wypl.label.domain.Label;
import com.butter.wypl.label.fixture.LabelFixture;
import com.butter.wypl.schedule.domain.Category;
import com.butter.wypl.schedule.domain.Schedule;
import com.butter.wypl.schedule.domain.embedded.Repetition;
import com.butter.wypl.schedule.fixture.embedded.RepetitionFixture;

import lombok.Getter;

@Getter
public enum ScheduleFixture {

	//라벨 없는 반복이 없는 개인 스케줄
	PERSONAL_EXERCISE_SCHEDULE(
		"테니스 가기",
		"장소 : 신촌 테니스",
		LocalDateTime.of(2024, 04, 26, 11, 0),
		LocalDateTime.of(2024, 04, 26, 13, 0),
		null,
		null,
		Category.MEMBER,
		null
	),
	//라벨 있고 반복 있는 개인 스케줄
	PERSONAL_REPEAT_EXERCISE_SCHEDULE(
		"헬스장 가기",
		null,
		LocalDateTime.of(2024, 04, 25, 11, 0),
		LocalDateTime.of(2024, 04, 25, 12, 0),
		LabelFixture.STUDY_LABEL.toLabel(),
		RepetitionFixture.TUESDAY_THRUSDAY_REPETITION.toRepetition(),
		Category.MEMBER,
		null
	),
	//반복 있는 그룹 스케줄
	REPEAT_GROUP_SCHEDULE(
		"알고르즘 스터디",
		"하루에 한문제씩 풀기",
		LocalDateTime.of(2024, 04, 27, 11, 0),
		LocalDateTime.of(2024, 04, 27, 12, 0),
		null,
		RepetitionFixture.LAST_DAY_REPETITION.toRepetition(),
		Category.GROUP,
		1
	),
	NO_REPEAT_GROUP_SCHEDULE(
		"알고르즘 스터디",
		"하루에 한문제씩 풀기",
		LocalDateTime.of(2024, 04, 27, 11, 0),
		LocalDateTime.of(2024, 04, 27, 12, 0),
		null,
		null,
		Category.GROUP,
		1
	);

	private final String title;

	private final String description;

	private final LocalDateTime startDate;

	private final LocalDateTime endDate;

	private final Label label;

	private final Repetition repetition;

	private final Category category;

	private final Integer groupId;

	ScheduleFixture(String title, String description, LocalDateTime startDate, LocalDateTime endDate,
		Label label, Repetition repetition, Category category, Integer groupId) {
		this.title = title;
		this.category = category;
		this.groupId = groupId;
		this.description = description;
		this.startDate = startDate;
		this.endDate = endDate;
		this.label = label;
		this.repetition = repetition;
	}

	public Schedule toSchedule() {
		return Schedule.builder()
			.title(title)
			.description(description)
			.category(category)
			.startDate(startDate)
			.endDate(endDate)
			.repetition(repetition)
			.label(label)
			.groupId(groupId)
			.build();
	}

}
