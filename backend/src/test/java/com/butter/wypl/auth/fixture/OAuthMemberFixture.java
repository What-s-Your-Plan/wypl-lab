package com.butter.wypl.auth.fixture;

import com.butter.wypl.infrastructure.ouath.OAuthMember;
import com.butter.wypl.infrastructure.ouath.google.GoogleOAuthMember;

import lombok.Getter;

@Getter
public enum OAuthMemberFixture {
	GOOGLE_OAUTH_MEMBER("google_subject", "wypl0428@gmail.com", "https://image.google.com/profile_image.png");

	private final String subject;
	private final String email;
	private final String profileImage;

	OAuthMemberFixture(String email, String subject, String profileImage) {
		this.email = email;
		this.subject = subject;
		this.profileImage = profileImage;
	}

	public OAuthMember toGoogleOAuthMember() {
		return new GoogleOAuthMember(subject, email, true, profileImage);
	}
}
