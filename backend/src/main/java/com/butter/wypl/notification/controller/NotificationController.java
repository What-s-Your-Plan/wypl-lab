package com.butter.wypl.notification.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.butter.wypl.auth.annotation.Authenticated;
import com.butter.wypl.auth.domain.AuthMember;
import com.butter.wypl.global.common.Message;
import com.butter.wypl.notification.data.response.NotificationPageResponse;
import com.butter.wypl.notification.service.NotificationLoadService;
import com.butter.wypl.notification.service.NotificationModifyService;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@RestController
@RequiredArgsConstructor
@RequestMapping("/notification/v1")
public class NotificationController {

	private final NotificationLoadService notificationLoadService;
	private final NotificationModifyService notificationModifyService;

	/**
	 * 최초 서버 연결시 회원 <-> 알림 Emitter 구독
	 *
	 * @param authMember  현재 로그인 된 회원 ID
	 * @param lastEventId 마지막 Emitter ID
	 * @return SseEmitter 는 Message 로 감싸서 보낼 시 직렬화되어서 클라이언트가 SseEmitter 정보를 제대로 받지못하기에
	 * ResponseEntity 로 감싸거나, SseEmitter 자체만 반환
	 */
	@GetMapping(value = "/subscribe", produces = "text/event-stream")
	public ResponseEntity<SseEmitter> subscribe(
		@Authenticated AuthMember authMember,
		@RequestHeader(value = "Last-Event-ID", required = false, defaultValue = "") String lastEventId
	) {
		/*
		 * 1. SseEmitter 생성, 회원 ID
		 * 2. Map 에 put
		 * 3. emitter 가 onCompletion or onTimeout 이면 Map 에서 제거
		 * */
		HttpHeaders headers = new HttpHeaders();
		headers.setContentType(MediaType.parseMediaType("text/event-stream;charset=UTF-8"));
		log.info("받은 값 : {}", authMember.getId());

		SseEmitter emitter = notificationModifyService.subscribeNotification(authMember.getId());

		return ResponseEntity.ok()
			.headers(headers)
			.body(emitter);
	}

	@GetMapping("/{lastId}")
	public ResponseEntity<Message<NotificationPageResponse>> getNotificationsPage(
		@Authenticated AuthMember authMember,
		@PathVariable("lastId") String lastId
	) {
		return ResponseEntity.ok()
			.body(Message.withBody("알림 조회 성공", notificationLoadService.getNotifications(authMember.getId(), lastId)));
	}

}
