package com.butter.wypl.infrastructure.ouath;

import java.util.HashMap;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import com.butter.wypl.auth.service.OAuthClient;
import com.butter.wypl.global.exception.CustomException;
import com.butter.wypl.global.exception.GlobalErrorCode;
import com.butter.wypl.global.utils.Base64Utils;
import com.butter.wypl.infrastructure.exception.InfraErrorCode;
import com.butter.wypl.infrastructure.exception.InfraException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import lombok.RequiredArgsConstructor;

@Profile({"default", "local", "dev", "prod"})
@RequiredArgsConstructor
@Component
public class GoogleOAuthClient implements OAuthClient {

	private static final String GOOGLE_OAUTH_REQUEST_URL = "https://www.googleapis.com/oauth2/v4/token";

	private final RestTemplate restTemplate;
	private final ObjectMapper objectMapper;

	@Value("${spring.security.oauth2.client.registration.google.client-id}")
	private String GOOGLE_CLIENT_ID;
	@Value("${spring.security.oauth2.client.registration.google.client-secret}")
	private String GOOGLE_CLIENT_SECRET;
	@Value("${spring.security.oauth2.client.registration.google.redirect-uri}")
	private String GOOGLE_REDIRECT_URI;

	@Override
	public GoogleOAuthMember getOAuthMember(
			final String code
	) {
		HashMap<String, String> requestParams = getRequestParams(code);

		ResponseEntity<GoogleOAuthResponse> googleOAuthResponseResponseEntity = restTemplate.postForEntity(
				GOOGLE_OAUTH_REQUEST_URL,
				requestParams,
				GoogleOAuthResponse.class);

		return getGoogleOAuthMember(googleOAuthResponseResponseEntity);
	}

	private GoogleOAuthMember getGoogleOAuthMember(
			final ResponseEntity<GoogleOAuthResponse> googleOAuthResponseResponseEntity
	) {
		if (googleOAuthResponseResponseEntity.getStatusCode() == HttpStatus.OK) {
			GoogleOAuthResponse body = getBodyByGoogleOAuthResponse(googleOAuthResponseResponseEntity);
			String payload = parseJws(body.idToken());
			return getGoogleOAuthMember(payload);
		}

		throw new InfraException(InfraErrorCode.INVALID_OAUTH_REQUEST);
	}

	private HashMap<String, String> getRequestParams(final String code) {
		HashMap<String, String> params = new HashMap<>();
		params.put("code", code);
		params.put("client_id", GOOGLE_CLIENT_ID);
		params.put("client_secret", GOOGLE_CLIENT_SECRET);
		params.put("redirect_uri", GOOGLE_REDIRECT_URI);
		params.put("grant_type", "authorization_code");
		return params;
	}

	private GoogleOAuthMember getGoogleOAuthMember(final String payload) {
		try {
			return objectMapper.readValue(payload, GoogleOAuthMember.class);
		} catch (JsonProcessingException e) {
			throw new CustomException(GlobalErrorCode.INTERNAL_SERVER_ERROR);
		}
	}

	private GoogleOAuthResponse getBodyByGoogleOAuthResponse(
			final ResponseEntity<GoogleOAuthResponse> googleOAuthResponseResponseEntity
	) {
		return Optional.ofNullable(googleOAuthResponseResponseEntity.getBody())
				.orElseThrow(() -> new InfraException(InfraErrorCode.BODY_IS_NULL));
	}

	private String parseJws(
			final String jws
	) {
		return Base64Utils.decode(jws.split("\\.")[1]);
	}
}
