package com.butter.wypl.label.service;

import java.util.ArrayList;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.butter.wypl.label.data.request.LabelRequest;
import com.butter.wypl.label.data.response.LabelIdResponse;
import com.butter.wypl.label.data.response.LabelListResponse;
import com.butter.wypl.label.data.response.LabelResponse;
import com.butter.wypl.label.domain.Label;
import com.butter.wypl.label.exception.LabelErrorCode;
import com.butter.wypl.label.exception.LabelException;
import com.butter.wypl.label.repository.LabelRepository;
import com.butter.wypl.label.utils.LabelServiceUtils;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class LabelServiceImpl implements LabelReadService, LabelModifyService {

	private final LabelRepository labelRepository;

	@Transactional
	@Override
	public LabelResponse createLabel(int memberId, LabelRequest labelRequest) {
		Label label = Label.builder()
			.title(labelRequest.title())
			.color(labelRequest.color())
			.memberId(memberId)
			.schedules(new ArrayList<>())
			.build();

		labelRepository.save(label);

		return LabelResponse.from(label);
	}

	@Transactional
	@Override
	public LabelResponse updateLabel(int memberId, int labelId, LabelRequest labelRequest) {
		Label label = checkValidationAndGetLabel(labelId, memberId);

		label.update(labelRequest.title(), labelRequest.color());

		return LabelResponse.from(label);
	}

	@Transactional
	@Override
	public LabelIdResponse deleteLabel(int labelId, int memberId) {
		Label label = checkValidationAndGetLabel(labelId, memberId);

		label.delete();

		return LabelIdResponse.from(label.getLabelId());
	}

	@Override
	public LabelResponse getLabelByLabelId(int labelId) {
		Label label = LabelServiceUtils.getLabelByLabelId(labelRepository, labelId);

		return LabelResponse.from(label);
	}

	@Override
	public LabelListResponse getLabelsByMemberId(int memberId) {
		return LabelListResponse.from(labelRepository.findByMemberId(memberId));
	}

	private Label checkValidationAndGetLabel(int labelId, int memberId) {
		Label label = LabelServiceUtils.getLabelByLabelId(labelRepository, labelId);

		if (label.getMemberId() != memberId) {
			throw new LabelException(LabelErrorCode.NO_PERMISSION_UPDATE);
		}

		return label;
	}

}
