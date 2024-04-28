package com.butter.wypl.auth.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.butter.wypl.auth.data.response.AuthTokensResponse;
import com.butter.wypl.auth.service.AuthService;
import com.butter.wypl.global.common.Message;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RequestMapping("/auth")
@RestController
public class AuthController {

	private final AuthService authService;

	@PostMapping("/v1/sign-in/{provider}")
	public ResponseEntity<Message<AuthTokensResponse>> signIn(
			@PathVariable("provider") String provider,
			@RequestParam("code") String code
	) {
		AuthTokensResponse response = authService.generateTokens(provider, code);
		return ResponseEntity.status(HttpStatus.CREATED)
				.body(Message.withBody("로그인에 성공하였습니다.", response));
	}
}
