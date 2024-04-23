package com.butter.wypl.auth.domain;

import org.springframework.data.redis.core.RedisHash;

import jakarta.persistence.Id;
import lombok.Getter;

@Getter
@RedisHash(timeToLive = 30 * 24 * 60 * 60)
public class RefreshToken {
	@Id
	private int memberId;
	private String token;
}
