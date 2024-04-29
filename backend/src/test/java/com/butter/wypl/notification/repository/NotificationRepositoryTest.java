package com.butter.wypl.notification.repository;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

import java.util.ArrayList;
import java.util.List;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.butter.wypl.global.annotation.MongoRepositoryTest;
import com.butter.wypl.notification.domain.Notification;
import com.butter.wypl.notification.domain.NotificationButton;

@MongoRepositoryTest
class NotificationRepositoryTest {

	@Autowired
	private NotificationRepository notificationRepository;

	/*
	 * 1. 알림 생성 종류
	 *  [그룹]
	 *  - 그룹 초대
	 *   param: 그룹ID
	 *  - 그룹 일정 등록 => 관련 일정인사람들만
	 *   param: 그룹ID, 일정ID
	 *  [회고]
	 *  - 회고록 작성하세요
	 *   param: 일정ID
	 *
	 * 2. 알림 조회
	 *  - 회원 ID로 조회, order by 생성일시 desc
	 * 3. 알림 삭제
	 *  - 읽지 않은 알림 => 생성일로부터 30일 지나면 삭제
	 *  - 읽은 알림 => 읽고 난 뒤 7일 뒤 삭제
	 */

	@Test
	@DisplayName("특정 이벤트 발생 후 알림을 생성한다.")
	void createNotificationTest() {
		// given
		String message = "";
		List<NotificationButton> buttons = new ArrayList<>();
		buttons.add(
			NotificationButton.builder()
				.text("수락")
				.actionUrl("ok")
				.color("#000000")
				.logo("수락이지롱")
				.build()
		);
		buttons.add(
			NotificationButton.builder()
				.text("취소")
				.actionUrl("cancel")
				.color("#000000")
				.logo("취소지롱")
				.build()
		);


		String type = "Group";

		Notification notification = Notification.builder()
			.memberId(1)
			.message(message)
			.buttons(buttons)
			.isRead(false)
			.type(type)
			.build();

		// when
		Notification savedNotification = notificationRepository.save(notification);

		// then
		assertThat(savedNotification).isNotNull();
		assertThat(savedNotification.getMemberId()).isEqualTo(1);
	}

}