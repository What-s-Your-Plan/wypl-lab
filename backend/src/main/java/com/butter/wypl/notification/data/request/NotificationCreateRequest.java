package com.butter.wypl.notification.data.request;

import com.butter.wypl.notification.data.NotificationTypeCode;

public record NotificationCreateRequest(
	int memberId,
	String nickName,
	String scheduleTitle,
	String teamName,
	NotificationTypeCode typeCode
) {
}
