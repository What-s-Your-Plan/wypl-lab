package com.butter.wypl.schedule.repository;

import static org.assertj.core.api.Assertions.*;

import java.util.Optional;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.butter.wypl.global.annotation.JpaRepositoryTest;
import com.butter.wypl.schedule.domain.Schedule;
import com.butter.wypl.schedule.fixture.ScheduleFixture;
import com.butter.wypl.schedule.respository.ScheduleRepository;

@JpaRepositoryTest
public class ScheduleRepositoryTest {

	private final ScheduleRepository scheduleRepository;

	@Autowired
	public ScheduleRepositoryTest(ScheduleRepository scheduleRepository) {
		this.scheduleRepository = scheduleRepository;
	}

	@Test
	@DisplayName("일정이 정상적으로 등록된다")
	void createSchedule() {
		//given
		Schedule schedule = ScheduleFixture.PERSONAL_EXERCISE_SCHEDULE.toSchedule();

		//when
		Schedule savedSchedule = scheduleRepository.save(schedule);

		//then
		assertThat(savedSchedule).isNotNull();
		assertThat(savedSchedule.getGroupId()).isNull();
	}

	@Test
	@DisplayName("일정이 정상적으로 조회된다")
	void getSchedule() {
		//given
		Schedule schedule = ScheduleFixture.PERSONAL_REPEAT_EXERCISE_SCHEDULE.toSchedule();
		Schedule savedSchedule = scheduleRepository.save(schedule);

		//when
		Optional<Schedule> getSchedule = scheduleRepository.findById(savedSchedule.getScheduleId());

		//then
		assertThat(getSchedule).isNotNull();
		if (getSchedule.isPresent()) {
			assertThat(getSchedule.get().getScheduleId()).isEqualTo(savedSchedule.getScheduleId());
			assertThat(getSchedule.get().getRepetition()).isEqualTo(savedSchedule.getRepetition());
		}
	}
}
