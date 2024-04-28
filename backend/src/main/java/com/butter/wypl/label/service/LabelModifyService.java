package com.butter.wypl.label.service;

import com.butter.wypl.label.controller.request.LabelRequestDto;
import com.butter.wypl.label.controller.response.LabelIdResponseDto;
import com.butter.wypl.label.controller.response.LabelResponseDto;

public interface LabelModifyService {
	LabelResponseDto createLabel(int memberId, LabelRequestDto labelRequestDto);

	LabelResponseDto updateLabel(int memberId, int labelId, LabelRequestDto labelRequestDto);

	LabelIdResponseDto deleteLabel(int labelId, int memberId);
}
