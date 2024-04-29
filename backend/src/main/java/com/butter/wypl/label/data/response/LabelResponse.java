package com.butter.wypl.label.data.response;

import com.butter.wypl.label.domain.Label;

public record LabelResponse(
	int labelId,
	int memberId,
	String title,
	String color
) {
	public static LabelResponse from(Label label) {
		return new LabelResponse(
			label.getLabelId(),
			label.getMemberId(),
			label.getTitle(),
			label.getColor().getColor()
		);
	}
}
