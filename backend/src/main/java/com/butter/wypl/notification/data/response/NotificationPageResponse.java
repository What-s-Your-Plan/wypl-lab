package com.butter.wypl.notification.data.response;

import java.util.List;

import org.springframework.data.domain.Page;

import com.butter.wypl.notification.domain.Notification;

public record NotificationPageResponse(
	// List<Notification> notifications, // 알림 List
	List<NotificationResponse> notifications, // 알림 List
	String lastId, // 마지막조회 알림 ID
	long totalNotificationCount, // 총 알림개수
	int totalPageCount, // 총 페이지수
	boolean hasNext, // 다음 페이지 여부
	int pageSize // 한 페이지 조회 건수
) {

	public static NotificationPageResponse of(Page<Notification> page) {
		// List<Notification> content = page.getContent();
		List<NotificationResponse> content = NotificationResponse.of(page.getContent());
		return new NotificationPageResponse(
			content,
    		content.isEmpty() ? null : content.get(content.size() - 1).id(),
    		page.getTotalElements(),
    		page.getTotalPages(),
    		page.hasNext(),
    		page.getSize()
    	);
	}
}
