package com.butter.wypl.label.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.butter.wypl.label.domain.Label;
import com.butter.wypl.label.domain.dto.LabelCreateDto;
import com.butter.wypl.label.domain.dto.LabelUpdateDto;
import com.butter.wypl.label.exception.LabelErrorCode;
import com.butter.wypl.label.exception.LabelException;
import com.butter.wypl.label.repository.LabelRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional
public class LabelServiceImpl implements LabelService{

	private final LabelRepository labelRepository;

	@Transactional
	@Override
	public Label createLabel(int memberId, LabelCreateDto labelCreateDto) {
		Label.colorValidation(labelCreateDto.getColor());
		Label.titleValidation(labelCreateDto.getTitle());

		Label label = Label.builder()
			.title(labelCreateDto.getTitle())
			.color(labelCreateDto.getColor())
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
		Label.colorValidation(labelUpdateDto.getColor());
		Label.titleValidation(labelUpdateDto.getTitle());

		label.update(labelUpdateDto.getTitle(), labelUpdateDto.getColor());
		labelRepository.save(label);

		return label;
	}

	@Transactional
	@Override
	public int deleteLabel(int labelId, int memberId){
		Label label = checkValidationAndGetLabel(labelId, memberId);

		label.delete();

		return label.getLabelId();
	}

	@Transactional(readOnly = true)
	@Override
	public Label getLabelByLabelId(int labelId){
		return labelRepository.findByLabelIdAndDeletedAtIsNull(labelId)
			.orElseThrow(()-> new LabelException(LabelErrorCode.NOT_FOUND));
	}

	@Transactional(readOnly = true)
	@Override
	public List<Label> getLabelsByMemberId(int memberId){
		return labelRepository.findByMemberIdAndDeletedAtIsNull(memberId);
	}

	private Label checkValidationAndGetLabel(int labelId, int memberId){
		Label label = getLabelByLabelId(labelId);

		if(label.getMemberId() != memberId)
			throw new LabelException(LabelErrorCode.NO_PERMISSION_UPDATE);

		return label;
	}

}
