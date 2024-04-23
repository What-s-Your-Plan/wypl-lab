package com.butter.wypl.auth.domain;

import lombok.Builder;

@Builder
public record JsonWebTokens(
		String accessToken,
		String refreshToken
) {

}
