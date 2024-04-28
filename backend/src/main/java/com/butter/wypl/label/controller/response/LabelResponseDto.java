package com.butter.wypl.label.controller.response;

import com.butter.wypl.label.domain.Label;

public record LabelResponseDto(
	int labelId,
	int memberId,
	String title,
	String color
) {
	public static LabelResponseDto from(Label label) {
		return new LabelResponseDto(
			label.getLabelId(),
			label.getMemberId(),
			label.getTitle(),
			label.getColor().getColor()
		);
	}
}
