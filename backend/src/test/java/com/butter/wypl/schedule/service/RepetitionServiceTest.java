package com.butter.wypl.schedule.service;

import static org.assertj.core.api.Assertions.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.butter.wypl.global.annotation.ServiceTest;
import com.butter.wypl.schedule.data.request.RepetitionCreateRequest;
import com.butter.wypl.schedule.domain.Repetition;
import com.butter.wypl.schedule.exception.ScheduleErrorCode;
import com.butter.wypl.schedule.exception.ScheduleException;
import com.butter.wypl.schedule.fixture.embedded.RepetitionFixture;

@ServiceTest
public class RepetitionServiceTest {

	private final RepetitionService repetitionService;

	@Autowired
	public RepetitionServiceTest(RepetitionService repetitionService) {
		this.repetitionService = repetitionService;
	}

	@Test
	@DisplayName("repetition 생성")
	void createRepetition() {
		// Given
		Repetition repetition = RepetitionFixture.MONTHLY_REPETITION.toRepetition();

		// When
		Repetition savedRepetition = repetitionService.createRepetition(RepetitionCreateRequest.from(repetition));

		// Then
		assertThat(savedRepetition).isNotNull();
		assertThat(savedRepetition.getRepetitionCycle()).isEqualTo(repetition.getRepetitionCycle());
		assertThat(savedRepetition.getRepetitionStartDate()).isEqualTo(repetition.getRepetitionStartDate());
		assertThat(savedRepetition.getRepetitionEndDate()).isEqualTo(repetition.getRepetitionEndDate());
	}

	@Test
	@DisplayName("반복 삭제")
	void deleteRepetition() {
		// Given
		Repetition repetition = RepetitionFixture.MONTHLY_REPETITION.toRepetition();
		Repetition savedRepetition = repetitionService.createRepetition(RepetitionCreateRequest.from(repetition));

		// When
		repetitionService.deleteRepetition(savedRepetition);

		// Then
		assertThat(savedRepetition.getDeletedAt()).isNotNull();
	}

	@Test
	@DisplayName("정상적으로 조회되는지 확인")
	void getRepetition() {
		// Given
		Repetition repetition = RepetitionFixture.MONTHLY_REPETITION.toRepetition();
		Repetition savedRepetition = repetitionService.createRepetition(RepetitionCreateRequest.from(repetition));

		// When
		Repetition findRepetition = repetitionService.getRepetition(savedRepetition.getRepetitionId());

		// Then

		assertThat(findRepetition).isNotNull();
		assertThat(findRepetition.getRepetitionCycle()).isEqualTo(savedRepetition.getRepetitionCycle());
		assertThat(findRepetition.getRepetitionStartDate()).isEqualTo(savedRepetition.getRepetitionStartDate());
		assertThat(findRepetition.getRepetitionEndDate()).isEqualTo(savedRepetition.getRepetitionEndDate());
	}

	@Test
	@DisplayName("조회 에러 확인")
	void getRepetitionException() {
		// Given
		Repetition repetition = RepetitionFixture.MONTHLY_REPETITION.toRepetition();

		// When
		// Then
		assertThatThrownBy(() -> {
			repetitionService.getRepetition(1);
		}).isInstanceOf(ScheduleException.class)
			.hasMessageContaining(ScheduleErrorCode.NO_REPETITION.getMessage());
	}
}
