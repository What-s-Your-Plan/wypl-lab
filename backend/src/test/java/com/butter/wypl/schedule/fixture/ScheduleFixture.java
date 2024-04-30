package com.butter.wypl.schedule.fixture;

import java.time.LocalDateTime;
import java.util.List;

import com.butter.wypl.schedule.data.request.RepetitionRequest;
import com.butter.wypl.schedule.data.request.ScheduleRequest;
import com.butter.wypl.schedule.data.response.MemberIdResponse;
import com.butter.wypl.schedule.domain.Category;
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
		1,
		List.of(new MemberIdResponse(1))
	),
	//라벨 있고 반복 있는 개인 스케줄
	PERSONAL_REPEAT_EXERCISE_SCHEDULE(
		"헬스장 가기",
		null,
		LocalDateTime.of(2024, 04, 25, 11, 0),
		LocalDateTime.of(2024, 04, 25, 12, 0),
		1,
		RepetitionFixture.TUESDAY_THRUSDAY_REPETITION.toRepetitionRequest(),
		Category.MEMBER,
		1,
		List.of(new MemberIdResponse(1))
	),
	//반복 있는 그룹 스케줄
	REPEAT_GROUP_SCHEDULE(
		"알고르즘 스터디",
		"하루에 한문제씩 풀기",
		LocalDateTime.of(2024, 04, 27, 11, 0),
		LocalDateTime.of(2024, 04, 27, 12, 0),
		null,
		RepetitionFixture.LAST_DAY_REPETITION.toRepetitionRequest(),
		Category.GROUP,
		1,
		List.of(new MemberIdResponse(1), new MemberIdResponse(2), new MemberIdResponse(3))
	),
	NO_REPEAT_GROUP_SCHEDULE(
		"알고르즘 스터디",
		"하루에 한문제씩 풀기",
		LocalDateTime.of(2024, 04, 27, 11, 0),
		LocalDateTime.of(2024, 04, 27, 12, 0),
		null,
		null,
		Category.GROUP,
		1,
		List.of(new MemberIdResponse(1), new MemberIdResponse(2), new MemberIdResponse(3))
	);

	private final String title;

	private final String description;

	private final LocalDateTime startDate;

	private final LocalDateTime endDate;

	private final Integer labelId;

	private final RepetitionRequest repetition;

	private final Category category;

	private final int ownerId;

	private final List<MemberIdResponse> members;

	ScheduleFixture(String title, String description, LocalDateTime startDate, LocalDateTime endDate,
		Integer labelId, RepetitionRequest repetition, Category category, int ownerId, List<MemberIdResponse> members) {
		this.title = title;
		this.category = category;
		this.ownerId = ownerId;
		this.description = description;
		this.startDate = startDate;
		this.endDate = endDate;
		this.labelId = labelId;
		this.repetition = repetition;
		this.members = members;
	}

	public ScheduleRequest toScheduleRequest() {
		return ScheduleRequest.builder()
			.title(title)
			.description(description)
			.category(category)
			.startDate(startDate)
			.endDate(endDate)
			.repetition(repetition)
			.labelId(labelId)
			.ownerId(ownerId)
			.members(members)
			.build();
	}

}
