package com.butter.wypl.review.fixture;

import com.butter.wypl.member.fixture.MemberFixture;
import com.butter.wypl.review.domain.Review;
import com.butter.wypl.schedule.domain.MemberSchedule;
import com.butter.wypl.schedule.fixture.ScheduleFixture;

public enum ReviewFixture {

	STUDY_REVIEW("공부하기 싫다",
			new MemberSchedule(1, MemberFixture.KIM_JEONG_UK.toMemberWithId(1),
					ScheduleFixture.PERSONAL_SCHEDULE.toSchedule(), false)
	),
	STUDY_REVIEW_2("오늘도 공부하기 싫다",
			new MemberSchedule(2, MemberFixture.JWA_SO_YEON.toMemberWithId(1),
					ScheduleFixture.PERSONAL_SCHEDULE.toSchedule(), false)
	);

	private final String title;

	private final MemberSchedule memberSchedule;

	ReviewFixture(String title, MemberSchedule memberSchedule) {
		this.title = title;
		this.memberSchedule = memberSchedule;
	}

	public Review toReview() {
		return Review.builder()
				.title(title)
				.memberSchedule(memberSchedule)
				.build();
	}

	public Review toReviewWithMemberSchedule(MemberSchedule memberSchedule) {
		return Review.builder()
				.title(title)
				.memberSchedule(memberSchedule)
				.build();
	}
}
