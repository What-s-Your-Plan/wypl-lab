package com.butter.wypl.member.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.butter.wypl.auth.domain.AuthMember;
import com.butter.wypl.member.data.request.MemberBirthdayUpdateRequest;
import com.butter.wypl.member.data.request.MemberNicknameUpdateRequest;
import com.butter.wypl.member.data.response.FindTimezonesResponse;
import com.butter.wypl.member.data.response.MemberBirthdayUpdateResponse;
import com.butter.wypl.member.data.response.MemberNicknameUpdateResponse;
import com.butter.wypl.member.domain.CalendarTimeZone;
import com.butter.wypl.member.domain.Member;
import com.butter.wypl.member.repository.MemberRepository;
import com.butter.wypl.member.utils.MemberServiceUtils;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class MemberServiceImpl implements MemberModifyService, MemberLoadService {

	private final MemberRepository memberRepository;

	@Override
	public FindTimezonesResponse findMemberTimezones(final AuthMember authMember) {
		Member findMember = MemberServiceUtils.findById(memberRepository, authMember.getId());

		List<CalendarTimeZone> timeZones = CalendarTimeZone.getTimeZones();

		return FindTimezonesResponse.of(findMember.getTimeZone(), timeZones);
	}

	@Transactional
	@Override
	public MemberNicknameUpdateResponse updateNickname(
			final AuthMember authMember,
			final MemberNicknameUpdateRequest request
	) {
		Member findMember = MemberServiceUtils.findById(memberRepository, authMember.getId());

		findMember.changeNickname(request.nickname());

		return new MemberNicknameUpdateResponse(findMember.getNickname());
	}

	@Transactional
	@Override
	public MemberBirthdayUpdateResponse updateBirthday(
			final AuthMember authMember,
			final MemberBirthdayUpdateRequest request
	) {
		Member findMember = MemberServiceUtils.findById(memberRepository, authMember.getId());

		findMember.changeBirthday(request.birthday());

		return MemberBirthdayUpdateResponse.from(findMember.getBirthday());
	}
}
