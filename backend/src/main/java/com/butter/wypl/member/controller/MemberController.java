package com.butter.wypl.member.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.butter.wypl.auth.annotation.Authenticated;
import com.butter.wypl.auth.domain.AuthMember;
import com.butter.wypl.global.common.Message;
import com.butter.wypl.member.data.request.MemberBirthdayUpdateRequest;
import com.butter.wypl.member.data.request.MemberNicknameUpdateRequest;
import com.butter.wypl.member.data.response.MemberBirthdayUpdateResponse;
import com.butter.wypl.member.data.response.MemberNicknameUpdateResponse;
import com.butter.wypl.member.service.MemberLoadService;
import com.butter.wypl.member.service.MemberModifyService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RequestMapping("/member")
@RestController
public class MemberController {
	private final MemberLoadService memberLoadService;
	private final MemberModifyService memberModifyService;

	@PatchMapping("/v1/members/nickname")
	public ResponseEntity<Message<MemberNicknameUpdateResponse>> changeNickname(
			@Authenticated AuthMember authMember,
			@RequestBody MemberNicknameUpdateRequest request
	) {
		MemberNicknameUpdateResponse response = memberModifyService.updateNickname(authMember, request);
		return ResponseEntity.ok(Message.withBody("닉네임을 수정하였습니다.", response));
	}

	@PatchMapping("/v1/members/birthday")
	public ResponseEntity<Message<MemberBirthdayUpdateResponse>> changeBirthday(
			@Authenticated AuthMember authMember,
			@RequestBody MemberBirthdayUpdateRequest request
	) {
		MemberBirthdayUpdateResponse response = memberModifyService.updateBirthday(authMember, request);
		return ResponseEntity.ok(Message.withBody("생일을 수정하였습니다", response));
	}
}
