package com.butter.wypl.label.service;

import com.butter.wypl.label.domain.Label;
import com.butter.wypl.label.domain.dto.LabelCreateDto;
import com.butter.wypl.label.domain.dto.LabelUpdateDto;

public interface LabelModifyService {
	Label createLabel(int memberId, LabelCreateDto labelCreateDto);

	Label updateLabel(int memberId, int labelId, LabelUpdateDto labelUpdateDto);

	int deleteLabel(int labelId, int memberId);
}
