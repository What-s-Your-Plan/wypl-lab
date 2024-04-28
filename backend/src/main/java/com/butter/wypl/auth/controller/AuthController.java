package com.butter.wypl.auth.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.butter.wypl.auth.service.AuthService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RequestMapping("/auth")
@RestController
public class AuthController {

	private final AuthService authService;

	// TODO: 로그인 및 회원가입 코드 작성
	@PostMapping("/v1/sign-in/{provider}")
	public ResponseEntity<Void> signIn(
			@PathVariable("provider") String provider,
			@RequestParam("code") String code
	) {
		return ResponseEntity.status(HttpStatus.CREATED).build();
	}
}
