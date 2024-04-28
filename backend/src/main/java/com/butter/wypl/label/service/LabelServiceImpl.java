package com.butter.wypl.label.service;

import java.util.ArrayList;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.butter.wypl.global.common.Color;
import com.butter.wypl.label.controller.request.LabelRequestDto;
import com.butter.wypl.label.controller.response.LabelIdResponseDto;
import com.butter.wypl.label.controller.response.LabelListResponseDto;
import com.butter.wypl.label.controller.response.LabelResponseDto;
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
	public LabelResponseDto createLabel(int memberId, LabelRequestDto labelRequestDto) {
		Label.titleValidation(labelRequestDto.title());

		Label label = Label.builder()
			.title(labelRequestDto.title())
			.color(Color.from(labelRequestDto.color()))
			.memberId(memberId)
			.schedules(new ArrayList<>())
			.build();

		labelRepository.save(label);

		return LabelResponseDto.from(label);
	}

	@Transactional
	@Override
	public LabelResponseDto updateLabel(int memberId, int labelId, LabelRequestDto labelRequestDto) {
		Label label = checkValidationAndGetLabel(labelId, memberId);
		Label.titleValidation(labelRequestDto.title());

		label.update(labelRequestDto.title(), Color.from(labelRequestDto.color()));

		return LabelResponseDto.from(label);
	}

	@Transactional
	@Override
	public LabelIdResponseDto deleteLabel(int labelId, int memberId) {
		Label label = checkValidationAndGetLabel(labelId, memberId);

		label.delete();

		return LabelIdResponseDto.from(label.getLabelId());
	}

	@Override
	public LabelResponseDto getLabelByLabelId(int labelId) {
		Label label = LabelServiceUtils.getLabelByLabelId(labelRepository, labelId);

		return LabelResponseDto.from(label);
	}

	@Override
	public LabelListResponseDto getLabelsByMemberId(int memberId) {
		return LabelListResponseDto.from(labelRepository.findByMemberId(memberId));
	}

	private Label checkValidationAndGetLabel(int labelId, int memberId) {
		Label label = LabelServiceUtils.getLabelByLabelId(labelRepository, labelId);

		if (label.getMemberId() != memberId) {
			throw new LabelException(LabelErrorCode.NO_PERMISSION_UPDATE);
		}

		return label;
	}

}
