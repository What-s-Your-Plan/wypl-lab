package com.butter.wypl.label.controller.response;

public record LabelIdResponseDto(
	int labelId
) {
	public static LabelIdResponseDto from(int labelId) {
		return new LabelIdResponseDto(labelId);
	}
}
