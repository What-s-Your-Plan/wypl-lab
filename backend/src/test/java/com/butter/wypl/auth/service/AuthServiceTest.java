package com.butter.wypl.auth.service;

import static com.butter.wypl.auth.fixture.OAuthMemberFixture.*;
import static com.butter.wypl.member.fixture.MemberFixture.*;
import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.BDDMockito.*;

import java.util.Optional;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import com.butter.wypl.auth.data.JsonWebTokens;
import com.butter.wypl.auth.data.response.AuthTokensResponse;
import com.butter.wypl.auth.domain.RefreshToken;
import com.butter.wypl.auth.domain.RefreshTokenRepository;
import com.butter.wypl.auth.utils.JwtProvider;
import com.butter.wypl.global.annotation.MockServiceTest;
import com.butter.wypl.infrastructure.ouath.OAuthMemberProvider;
import com.butter.wypl.member.domain.Member;
import com.butter.wypl.member.repository.MemberRepository;

@MockServiceTest
class AuthServiceTest {

	@InjectMocks
	private AuthService authService;
	@Mock
	private SignInService signInService;
	@Mock
	private OAuthMemberProvider oAuthMemberProvider;
	@Mock
	private JwtProvider jwtProvider;
	@Mock
	private MemberRepository memberRepository;
	@Mock
	private RefreshTokenRepository refreshTokenRepository;

	@DisplayName("JsonWebTokens 발급에 성공한다.")
	@Test
	void generateTokensSuccess() {
		/* Given */
		String googleProvider = "google";
		String dummyCode = "dummy_code";
		given(oAuthMemberProvider.getOAuthMember(googleProvider, dummyCode))
				.willReturn(GOOGLE_OAUTH_MEMBER.toGoogleOAuthMember());

		Member member = KIM_JEONG_UK.toMember();
		given(memberRepository.findByEmail(member.getEmail()))
				.willReturn(Optional.of(member));

		JsonWebTokens tokens = new JsonWebTokens("at", "rt");
		given(jwtProvider.generateJsonWebTokens(0))
				.willReturn(tokens);

		RefreshToken refreshToken = RefreshToken.of(0, tokens.refreshToken());
		given(refreshTokenRepository.save(refreshToken))
				.willReturn(refreshToken);

		/* When */
		AuthTokensResponse response = authService.generateTokens(googleProvider, dummyCode);

		/* Then */
		assertAll(
				() -> assertThat(response.accessToken()).isNotNull(),
				() -> assertThat(response.refreshToken()).isNotNull()
		);
	}

	@DisplayName("회원가입과 동시에 JsonWebTokens 발급에 성공한다.")
	// @Test
	void generateTokensSuccessWithSignIn() {
		/* Given */
		String googleProvider = "google";
		String dummyCode = "dummy_code";
		given(oAuthMemberProvider.getOAuthMember(googleProvider, dummyCode))
				.willReturn(GOOGLE_OAUTH_MEMBER.toGoogleOAuthMember());

		Member member = KIM_JEONG_UK.toMember();
		given(memberRepository.findByEmail(member.getEmail()))
				.willReturn(Optional.empty());

		JsonWebTokens tokens = new JsonWebTokens("at", "rt");
		given(jwtProvider.generateJsonWebTokens(0))
				.willReturn(tokens);

		RefreshToken refreshToken = RefreshToken.of(0, tokens.refreshToken());
		given(refreshTokenRepository.save(refreshToken))
				.willReturn(refreshToken);

		/* When */
		AuthTokensResponse response = authService.generateTokens(googleProvider, dummyCode);

		/* Then */
		assertAll(
				() -> assertThat(response.accessToken()).isNotNull(),
				() -> assertThat(response.refreshToken()).isNotNull()
		);
	}
}