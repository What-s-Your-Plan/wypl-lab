package com.butter.wypl.member.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.butter.wypl.auth.domain.AuthMember;
import com.butter.wypl.member.data.request.MemberNicknameUpdateRequest;
import com.butter.wypl.member.data.response.MemberNicknameUpdateResponse;
import com.butter.wypl.member.domain.Member;
import com.butter.wypl.member.repository.MemberRepository;
import com.butter.wypl.member.utils.MemberServiceUtils;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class MemberServiceImpl implements MemberModifyService, MemberLoadService {

	private final MemberRepository memberRepository;

	@Transactional
	@Override
	public MemberNicknameUpdateResponse modifyNickname(
			final AuthMember authMember,
			final MemberNicknameUpdateRequest request
	) {
		Member findMember = MemberServiceUtils.findById(memberRepository, authMember.getId());

		findMember.changeNickname(request.nickname());

		return new MemberNicknameUpdateResponse(findMember.getNickname());
	}
}
