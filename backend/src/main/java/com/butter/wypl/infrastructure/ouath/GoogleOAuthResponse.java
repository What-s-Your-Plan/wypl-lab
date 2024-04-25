package com.butter.wypl.infrastructure.ouath;

import com.fasterxml.jackson.annotation.JsonProperty;

public record GoogleOAuthResponse(
		@JsonProperty("access_token")
		String accessToken,
		@JsonProperty("expires_in")
		long expiresIn,
		@JsonProperty("token_type")
		String tokenType,
		@JsonProperty("id_token")
		String idToken
) {
}
