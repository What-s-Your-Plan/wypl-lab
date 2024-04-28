package com.butter.wypl.auth.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import com.butter.wypl.auth.data.JsonWebTokens;
import com.butter.wypl.member.domain.Member;

import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@RedisHash(timeToLive = 30 * 24 * 60 * 60)
public class RefreshToken {
	@Id
	private int memberId;
	private String token;

	private RefreshToken(
			final int memberId,
			final String token
	) {
		this.token = token;
		this.memberId = memberId;
	}

	public static RefreshToken of(
			final Member member,
			final JsonWebTokens jsonWebTokens
	) {
		return new RefreshToken(member.getId(), jsonWebTokens.refreshToken());
	}
}
