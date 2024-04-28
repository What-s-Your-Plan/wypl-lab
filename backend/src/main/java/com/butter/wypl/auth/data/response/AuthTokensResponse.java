package com.butter.wypl.auth.data.response;

import com.fasterxml.jackson.annotation.JsonProperty;

public record AuthTokensResponse(
		@JsonProperty("member_id")
		int memberId,
		@JsonProperty("access_token")
		String accessToken,
		@JsonProperty("refresh_token")
		String refreshToken
) {
}
