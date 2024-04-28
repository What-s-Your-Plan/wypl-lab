package com.butter.wypl.label.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.butter.wypl.global.common.Message;
import com.butter.wypl.label.controller.request.LabelRequestDto;
import com.butter.wypl.label.controller.response.LabelIdResponseDto;
import com.butter.wypl.label.controller.response.LabelListResponseDto;
import com.butter.wypl.label.controller.response.LabelResponseDto;
import com.butter.wypl.label.service.LabelServiceImpl;

import lombok.RequiredArgsConstructor;

@RestController
@RequiredArgsConstructor
@RequestMapping("/label/v1/labels")
public class LabelController {

	private final LabelServiceImpl labelService;

	@GetMapping("/")
	public ResponseEntity<Message<LabelResponseDto>> getLabelByLabelId(
		@RequestParam int labelId
	) {
		return ResponseEntity
			.ok()
			.body(
				new Message<>("라벨 id로 라벨 조회 성공", labelService.getLabelByLabelId(labelId))
			);
	}

	@GetMapping
	public ResponseEntity<Message<LabelListResponseDto>> getLabelsByMemberId(
		@RequestHeader("memberId") int memberId
	) {
		return ResponseEntity
			.ok()
			.body(
				new Message<>("멤버 id로 라벨 리스트 조회 성공", labelService.getLabelsByMemberId(memberId))
			);
	}

	@PostMapping
	public ResponseEntity<Message<LabelResponseDto>> createLabel(
		@RequestHeader("memberId") int memberId,
		@RequestBody LabelRequestDto labelRequestDto
	) {
		return ResponseEntity
			.ok()
			.body(
				new Message<>("라벨 생성 성공", labelService.createLabel(memberId, labelRequestDto))
			);
	}

	@PatchMapping
	public ResponseEntity<Message<LabelResponseDto>> updateLabel(
		@RequestHeader("memberId") int memberId,
		@RequestParam int labelId,
		@RequestBody LabelRequestDto labelRequestDto
	) {
		return ResponseEntity
			.ok()
			.body(
				new Message<>("라벨 수정 성공", labelService.updateLabel(memberId, labelId, labelRequestDto))
			);
	}

	@DeleteMapping
	public ResponseEntity<Message<LabelIdResponseDto>> deleteLabel(
		@RequestHeader("memberId") int memberId,
		@RequestHeader("labelId") int labelId
	) {
		return ResponseEntity
			.ok()
			.body(
				new Message<>("라벨 삭제 성공", labelService.deleteLabel(labelId, memberId))
			);
	}
}
