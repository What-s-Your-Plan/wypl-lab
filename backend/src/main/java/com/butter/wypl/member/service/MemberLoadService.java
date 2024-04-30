package com.butter.wypl.member.service;

import com.butter.wypl.auth.domain.AuthMember;
import com.butter.wypl.member.data.response.FindTimezonesResponse;

public interface MemberLoadService {
	FindTimezonesResponse findAllTimezones(final AuthMember authMember);
}
