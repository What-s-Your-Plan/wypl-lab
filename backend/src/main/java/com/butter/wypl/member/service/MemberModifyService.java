package com.butter.wypl.member.service;

import com.butter.wypl.auth.domain.AuthMember;
import com.butter.wypl.member.data.request.MemberBirthdayUpdateRequest;
import com.butter.wypl.member.data.request.MemberNicknameUpdateRequest;
import com.butter.wypl.member.data.request.MemberTimezoneUpdateRequest;
import com.butter.wypl.member.data.response.MemberBirthdayUpdateResponse;
import com.butter.wypl.member.data.response.MemberNicknameUpdateResponse;
import com.butter.wypl.member.data.response.MemberTimezoneUpdateResponse;

public interface MemberModifyService {
	MemberNicknameUpdateResponse updateNickname(
			final AuthMember authMember,
			final MemberNicknameUpdateRequest request
	);

	MemberBirthdayUpdateResponse updateBirthday(
			final AuthMember authMember,
			final MemberBirthdayUpdateRequest request
	);

	MemberTimezoneUpdateResponse updateTimezone(
			final AuthMember authMember,
			final MemberTimezoneUpdateRequest request
	);
}
