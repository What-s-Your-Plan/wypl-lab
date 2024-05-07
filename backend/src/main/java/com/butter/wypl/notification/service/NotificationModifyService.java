package com.butter.wypl.notification.service;

import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.butter.wypl.notification.data.request.NotificationCreateRequest;

public interface NotificationModifyService {

	void createNotification(final NotificationCreateRequest notificationCreateRequest);

	SseEmitter subscribeNotification(final int memberId);
}
