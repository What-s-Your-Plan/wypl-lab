package com.butter.wypl.schedule.respository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.butter.wypl.schedule.domain.Schedule;

public interface ScheduleRepository extends JpaRepository<Schedule, Integer> {

	Optional<Schedule> findById(int scheduleId);

}

