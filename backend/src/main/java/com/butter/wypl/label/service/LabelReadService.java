package com.butter.wypl.label.service;

import java.util.List;

import com.butter.wypl.label.domain.Label;

public interface LabelReadService {
	Label getLabelByLabelId(int labelId);

	List<Label> getLabelsByMemberId(int memberId);
}
