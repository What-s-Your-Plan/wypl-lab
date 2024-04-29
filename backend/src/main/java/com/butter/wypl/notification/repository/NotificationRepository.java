package com.butter.wypl.notification.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.butter.wypl.notification.domain.Notification;

public interface NotificationRepository extends MongoRepository<Notification, String> {

}
