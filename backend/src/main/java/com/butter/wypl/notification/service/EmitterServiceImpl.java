package com.butter.wypl.notification.service;

import java.io.IOException;
import java.util.Map;

import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.butter.wypl.notification.data.response.NotificationResponse;
import com.butter.wypl.notification.domain.Notification;
import com.butter.wypl.notification.repository.EmitterRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;

@Log4j2
@Service
@RequiredArgsConstructor
public class EmitterServiceImpl implements EmitterModifyService{

	private final static Long EMITTER_TIMEOUT = 30L * 1000 * 60;
	private final EmitterRepository emitterRepository;


	@Override
	public SseEmitter subscribeNotification(final int memberId, final String lastEventId) {
		SseEmitter emitter = new SseEmitter(EMITTER_TIMEOUT);
		String emitterId = makeSseEmitterId(memberId);

		emitterRepository.save(emitterId, emitter);
		emitter.onCompletion(() -> emitterRepository.deleteByEmitterId(emitterId));
		emitter.onTimeout(() -> emitterRepository.deleteByEmitterId(emitterId));

		String eventId = makeSseEmitterId(memberId);
		sendEmitter(emitter, eventId, emitterId, "최초 연결");

		// 클라이언트가 미수신한 Event 목록이 존재할 경우 전송 -> Event 유실 예방
		if (hasLostData(lastEventId)) {
			sendLostData(lastEventId,memberId,emitterId,emitter);
		}

		return emitter;
	}

	/**
	 * 특정 활동 후 회원에게 Emitter send -> 그룹 초대, 일정 종료 후 회고 작성
	 */
	@Override
	public void sendEmitter(
		final SseEmitter emitter,
		final String eventId,
		final String emitterId,
		final Object object) {

		try {
			if (object instanceof Notification notification) {
				emitter.send(SseEmitter.event()
					.id(eventId)
					.name("notification")
					.data(NotificationResponse.from(notification))
				);
			} else {
				emitter.send(SseEmitter.event()
					.id(eventId)
					.name("sse")
					.data(object)
				);
			}

		} catch (IOException e) {
			emitterRepository.deleteByEmitterId(emitterId);
		}
	}

	private boolean hasLostData(String lastEventId) {
		return !lastEventId.isEmpty();
	}

	private void sendLostData(final String lastEventId, final int memberId, final String emitterId, final SseEmitter emitter) {
		Map<String, Object> eventCaches = emitterRepository.findAllEventCacheStartWithByMemberId(String.valueOf(memberId));

		eventCaches.entrySet().stream()
			.filter(entry -> lastEventId.compareTo(entry.getKey()) < 0)
			.forEach(entry -> sendEmitter(emitter, entry.getKey(), emitterId, entry.getValue()));
	}

	private String makeSseEmitterId(final int memberId) {
		return memberId + "_" + System.currentTimeMillis();
	}
}
