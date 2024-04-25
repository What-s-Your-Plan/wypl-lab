package com.butter.wypl.auth.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RequestMapping("/login/oauth2/code")
@RestController
public class OAuthController {

	@GetMapping("/google")
	public ResponseEntity<String> google(
			@RequestParam("code") String code
	) {
		// TODO:
		return ResponseEntity.ok(code);
	}
}
