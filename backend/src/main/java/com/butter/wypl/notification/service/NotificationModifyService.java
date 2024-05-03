package com.butter.wypl.notification.service;

import com.butter.wypl.notification.data.request.NotificationCreateRequest;
import com.butter.wypl.notification.domain.Notification;

public interface NotificationModifyService {

	Notification createNotification(final NotificationCreateRequest notificationCreateRequest);
}
