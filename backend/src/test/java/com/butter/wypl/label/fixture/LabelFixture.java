package com.butter.wypl.label.fixture;

import com.butter.wypl.global.common.Color;
import com.butter.wypl.label.domain.Label;

public enum LabelFixture {
	EXERCISE_LABEL("운동", "ff7f00", 1),
	STUDY_LABEL("알고리즘 스터디", "000080", 1),
	;

	private final String title;

	private final String color;

	private final int memberId;

	LabelFixture(String title, String color, int memberId) {
		this.title = title;
		this.color = color;
		this.memberId = memberId;
	}

	public Label toLabel() {
		return Label.builder()
			.title(title)
			.color(Color.from(color))
			.memberId(memberId)
			.build();
	}
}
