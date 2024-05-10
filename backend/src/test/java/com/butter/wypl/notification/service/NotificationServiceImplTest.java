package com.butter.wypl.notification.service;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.BDDMockito.*;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.EnumSource;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import com.butter.wypl.global.annotation.MockServiceTest;
import com.butter.wypl.notification.data.request.NotificationCreateRequest;
import com.butter.wypl.notification.domain.Notification;
import com.butter.wypl.notification.fixture.NotificationFixture;
import com.butter.wypl.notification.repository.EmitterRepository;
import com.butter.wypl.notification.repository.NotificationRepository;

@MockServiceTest
class NotificationServiceImplTest {


	@Mock
	NotificationRepository notificationRepository;

	@Mock
	EmitterRepository emitterRepository;

	@InjectMocks
	NotificationServiceImpl notificationService;

	private static Logger logger;

	@BeforeEach
	void setLogger() {
		System.setProperty("log4j.configurationFile", "log4j2-dev.xml");

		logger = LogManager.getLogger();
	}

	@DisplayName("알림 생성 테스트")
	@ParameterizedTest()
	@EnumSource(NotificationFixture.class)
	void createNotification(NotificationFixture notificationFixture) {
	    //given
		NotificationCreateRequest request = notificationFixture.toNotificationCreateRequest();
		given(notificationRepository.save(any(Notification.class)))
			.willReturn(notificationFixture.toNotification());
		//when
	    //then
		assertThatCode(() -> {
			notificationService.createNotification(request);
		}).doesNotThrowAnyException();
	}

	@Test
	@DisplayName("Emitter 구독 테스트")
	void emitterCreateNotification() {
		int memberId = 1;

		SseEmitter emitter = mock(SseEmitter.class);

		willDoNothing().given(emitterRepository)
			.save(eq(memberId), any());

		SseEmitter sseEmitter = notificationService.subscribeNotification(memberId);
		then(emitterRepository).should().save(memberId, sseEmitter);
	}

	@Test
	@DisplayName("회원 알림 전체 삭제")
	void deleteNotification () {
	    //given
		int memberId = 1;
	    //when
		willDoNothing().given(notificationRepository)
			.deleteByMemberId(anyInt());

	    //then
		assertThatCode(() -> notificationService.deleteNotification(memberId)).doesNotThrowAnyException();
	}
}