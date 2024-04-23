package com.butter.wypl.auth.utils;

import java.security.Key;
import java.util.Date;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.butter.wypl.auth.data.JsonWebTokens;
import com.butter.wypl.auth.perproties.JwtProperties;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtProvider {
	private static final long ACCESS_TOKEN_EXPIRE_TIME = 30 * 60 * 1000L;
	private static final long REFRESH_TOKEN_EXPIRE_TIME = 30 * 24 * 60 * 60 * 1000L;

	private final Key accessKey;
	private final Key refreshKey;

	@Autowired
	public JwtProvider(JwtProperties jwtProperties) {
		accessKey = Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtProperties.getAccessKey()));
		refreshKey = Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtProperties.getAccessKey()));
	}

	public JsonWebTokens generateJsonWebTokens(
			final int memberId
	) {
		long now = System.currentTimeMillis();

		String accessToken = generateToken(new Date(now + ACCESS_TOKEN_EXPIRE_TIME), accessKey, memberId);
		String refreshToken = generateToken(new Date(now + REFRESH_TOKEN_EXPIRE_TIME), refreshKey, memberId);

		return JsonWebTokens.builder()
				.accessToken(accessToken)
				.refreshToken(refreshToken)
				.build();
	}

	private String generateToken(
			final Date now,
			final Key key,
			final int memberId
	) {
		return Jwts.builder()
				.setExpiration(now)
				.claim("member_id", memberId)
				.signWith(key, SignatureAlgorithm.HS512)
				.compact();
	}
}
