package com.butter.wypl.schedule.respository;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.butter.wypl.calendar.repository.CalendarRepositoryCustom;
import com.butter.wypl.schedule.domain.Repetition;
import com.butter.wypl.schedule.domain.Schedule;

public interface ScheduleRepository extends JpaRepository<Schedule, Integer>, CalendarRepositoryCustom {
	//해당 반복에 대해 모든 일정 찾기
	List<Schedule> findAllByRepetitionAndStartDateBefore(Repetition repetition, LocalDateTime startDate);

	//해당 반복에 대해 이후 일정 찾기
	List<Schedule> findAllByRepetitionAndStartDateAfter(Repetition repetition, LocalDateTime startDate);

	List<Schedule> findAllByGroupIdAndStartDateBetween(int groupId, LocalDateTime firstDate, LocalDateTime lastDate);
}

