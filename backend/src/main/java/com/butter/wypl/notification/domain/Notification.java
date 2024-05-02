package com.butter.wypl.notification.domain;

import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.butter.wypl.global.common.MongoBaseEntity;
import com.butter.wypl.notification.data.NotificationTypeCode;

import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@Getter
@Builder
@Document(collection = "notifications")
@ToString
public class Notification extends MongoBaseEntity {

	@Id
	private String id;

	private int memberId; // 알림 받는 회원
	private String message; // 알림 메시지 => ex) "자율 A602"팀 그룹 초대가 왔어요.
	private List<NotificationButton> buttons;
	private boolean isRead; // 읽음 여부,
	private NotificationTypeCode typeCode;

}
