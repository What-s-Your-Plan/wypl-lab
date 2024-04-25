package com.butter.wypl.auth.service;

public interface OAuthClient {
	OAuthMember getOAuthMember(final String code);
}
