package com.butter.wypl.auth.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.butter.wypl.auth.data.response.AuthTokensResponse;
import com.butter.wypl.auth.domain.RefreshTokenRepository;
import com.butter.wypl.auth.utils.JwtProvider;
import com.butter.wypl.member.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@Transactional(readOnly = true)
@RequiredArgsConstructor
@Service
public class AuthService {

	private final RefreshTokenRepository refreshTokenRepository;
	private final JwtProvider jwtProvider;
	private final MemberRepository memberRepository;

	@Transactional
	public AuthTokensResponse generateTokens(
			final String provider,
			final String code
	) {
		// TODO: 1. OAuth 요청
		// TODO: 2. 회원 존재하는지 확인
		// TODO: 2-1. 회원이 없다면 생성 후 저장
		// TODO: 3. 토큰 발행
		return null;
	}
}
