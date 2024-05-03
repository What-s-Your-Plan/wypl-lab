package com.butter.wypl.notification.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.butter.wypl.auth.annotation.Authenticated;
import com.butter.wypl.auth.domain.AuthMember;
import com.butter.wypl.notification.service.NotificationServiceImpl;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@RestController
@RequiredArgsConstructor
public class NotificationController {

	private final NotificationServiceImpl notificationService;

	@GetMapping(value = "/notification/subscribe", produces = "text/event-stream")
	public ResponseEntity<SseEmitter> subscribe(
		@Authenticated AuthMember authMember,
		@RequestHeader(value = "Last-Event-ID", required = false, defaultValue = "") String lastEventId
	) {
		/*
		 * 1. SseEmitter 생성, 회원ID
		 * 2. Map 에 put
		 * 3. emitter 가 onCompletion or onTimeout 이면 Map 에서 제거
		 * */
		// TODO
		// 시큐리티로부터 AuthenticationPrincipal

		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.parseMediaType("text/event-stream;charset=UTF-8"));
		log.info("받은 값 : {}", authMember.getId());

		SseEmitter emitter = notificationService.subscribeNotification(authMember.getId());

		return new ResponseEntity<>(emitter, headers, HttpStatus.OK);
	}


	@GetMapping("/send-data/{userId}")
	public void sendTest(@PathVariable int userId) {
		// public void sendTest(@PathVariable String userId) {
		notificationService.sendTest(userId);
	}
}
