package com.butter.wypl.member.service;

import com.butter.wypl.auth.domain.AuthMember;
import com.butter.wypl.member.data.request.MemberNicknameUpdateRequest;
import com.butter.wypl.member.data.response.MemberNicknameUpdateResponse;

public interface MemberModifyService {
	MemberNicknameUpdateResponse modifyNickname(
			final AuthMember authMember,
			final MemberNicknameUpdateRequest request
	);
}
