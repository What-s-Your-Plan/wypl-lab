package com.butter.wypl.label.data.response;

public record LabelIdResponse(
	int labelId
) {
	public static LabelIdResponse from(int labelId) {
		return new LabelIdResponse(labelId);
	}
}
