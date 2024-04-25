package com.butter.wypl.infrastructure.ouath;

import com.butter.wypl.auth.service.OAuthMember;
import com.fasterxml.jackson.annotation.JsonProperty;

public record GoogleOAuthMember(
		@JsonProperty("sub")
		String subject,
		@JsonProperty("email")
		String email,
		@JsonProperty("email_verified")
		boolean isEmailVerified,
		@JsonProperty("picture")
		String profileImage
) implements OAuthMember {
}
