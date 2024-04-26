package com.butter.wypl.label.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.butter.wypl.global.common.Color;
import com.butter.wypl.label.domain.Label;
import com.butter.wypl.label.domain.dto.LabelCreateDto;
import com.butter.wypl.label.domain.dto.LabelUpdateDto;
import com.butter.wypl.label.exception.LabelErrorCode;
import com.butter.wypl.label.exception.LabelException;
import com.butter.wypl.label.repository.LabelRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class LabelServiceImpl implements LabelReadService, LabelModifyService {

	private final LabelRepository labelRepository;

	@Transactional
	@Override
	public Label createLabel(int memberId, LabelCreateDto labelCreateDto) {
		Label.titleValidation(labelCreateDto.title());

		Label label = Label.builder()
			.title(labelCreateDto.title())
			.color(Color.of(labelCreateDto.color()))
			.memberId(memberId)
			.schedules(new ArrayList<>())
			.build();

		labelRepository.save(label);

		return label;
	}

	@Transactional
	@Override
	public Label updateLabel(int memberId, int labelId, LabelUpdateDto labelUpdateDto) {
		Label label = checkValidationAndGetLabel(labelId, memberId);
		Label.titleValidation(labelUpdateDto.title());

		label.update(labelUpdateDto.title(), Color.of(labelUpdateDto.color()));

		return label;
	}

	@Transactional
	@Override
	public int deleteLabel(int labelId, int memberId) {
		Label label = checkValidationAndGetLabel(labelId, memberId);

		label.delete();

		return label.getLabelId();
	}

	@Override
	public Label getLabelByLabelId(int labelId) {
		return labelRepository.findByLabelId(labelId)
			.orElseThrow(() -> new LabelException(LabelErrorCode.NOT_FOUND));
	}

	@Override
	public List<Label> getLabelsByMemberId(int memberId) {
		return labelRepository.findByMemberId(memberId);
	}

	private Label checkValidationAndGetLabel(int labelId, int memberId) {
		Label label = getLabelByLabelId(labelId);

		if (label.getMemberId() != memberId) {
			throw new LabelException(LabelErrorCode.NO_PERMISSION_UPDATE);
		}

		return label;
	}

}
