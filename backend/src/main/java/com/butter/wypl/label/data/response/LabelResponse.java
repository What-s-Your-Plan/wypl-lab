package com.butter.wypl.label.data.response;

import com.butter.wypl.label.domain.Label;
import com.fasterxml.jackson.annotation.JsonProperty;

public record LabelResponse(
	@JsonProperty("label_id")
	int labelId,

	@JsonProperty("member_id")
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
