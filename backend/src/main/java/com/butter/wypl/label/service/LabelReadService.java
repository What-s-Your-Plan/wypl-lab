package com.butter.wypl.label.service;

import com.butter.wypl.label.controller.response.LabelListResponseDto;
import com.butter.wypl.label.controller.response.LabelResponseDto;

public interface LabelReadService {
	LabelResponseDto getLabelByLabelId(int labelId);

	LabelListResponseDto getLabelsByMemberId(int memberId);
}
