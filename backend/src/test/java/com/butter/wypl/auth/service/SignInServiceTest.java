package com.butter.wypl.auth.service;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.butter.wypl.global.annotation.ServiceTest;
import com.butter.wypl.infrastructure.ouath.OAuthMember;
import com.butter.wypl.infrastructure.ouath.google.GoogleOAuthMember;
import com.butter.wypl.member.domain.Member;

@ServiceTest
class SignInServiceTest {

	@Autowired
	private SignInService signInService;

	@DisplayName("회원가입에 성공한다.")
	@Test
	void signInSuccess() {
		/* Given */
		OAuthMember oAuthMember = new GoogleOAuthMember("subject", "workju1124@gmail.com", true, "image");
		String provider = "google";

		/* When */
		Member member = signInService.signIn(oAuthMember, provider);

		/* Then */
		Assertions.assertThat(member).isNotNull();
	}
}