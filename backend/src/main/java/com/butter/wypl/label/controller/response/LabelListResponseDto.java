package com.butter.wypl.label.controller.response;

import java.util.ArrayList;
import java.util.List;

import com.butter.wypl.label.domain.Label;

public record LabelListResponseDto(
	int labelCount,
	List<LabelResponseDto> labels
) {

	public static LabelListResponseDto from(List<Label> labels) {
		List<LabelResponseDto> labelResponseDtoList = new ArrayList<>();

		for (Label label : labels) {
			labelResponseDtoList.add(LabelResponseDto.from(label));
		}

		return new LabelListResponseDto(labels.size(), labelResponseDtoList);
	}
}
