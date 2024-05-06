package com.butter.wypl.notification.service;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.BDDMockito.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.EnumSource;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import com.butter.wypl.global.annotation.MockServiceTest;
import com.butter.wypl.notification.data.request.NotificationCreateRequest;
import com.butter.wypl.notification.domain.Notification;
import com.butter.wypl.notification.fixture.NotificationFixture;
import com.butter.wypl.notification.repository.NotificationRepository;

@MockServiceTest
class NotificationServiceImplTest {

	@Mock
	NotificationRepository notificationRepository;

	@InjectMocks
	NotificationServiceImpl notificationService;

	@DisplayName("알림 생성 테스트")
	@ParameterizedTest
	@EnumSource(NotificationFixture.class)
	void createNotification(NotificationFixture notificationFixture) {
		//given
		NotificationCreateRequest request = notificationFixture.toNotificationCreateRequest();
		given(notificationRepository.save(any(Notification.class)))
				.willReturn(notificationFixture.toNotification());
		//when
		//then
		assertThatCode(() -> {
			Notification notification = notificationService.createNotification(request);
			assertThat(notification).isNotNull();
		})
				.doesNotThrowAnyException();
	}
}