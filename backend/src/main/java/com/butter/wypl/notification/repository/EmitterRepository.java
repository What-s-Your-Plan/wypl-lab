package com.butter.wypl.notification.repository;

import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Repository
public class EmitterRepository {

	private final Map<Integer, SseEmitter> emitters = new ConcurrentHashMap<>();

	public void save(final Integer memberId, final SseEmitter emitter) {
		emitters.put(memberId, emitter);
	}

	public void deleteByMemberId(final Integer memberId) {
		emitters.remove(memberId);
	}

	public Optional<SseEmitter> getByMemberId(final Integer memberId) {
		return Optional.ofNullable(emitters.get(memberId));
	}
}
