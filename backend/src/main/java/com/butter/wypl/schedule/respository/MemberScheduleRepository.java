package com.butter.wypl.schedule.respository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.butter.wypl.schedule.domain.MemberSchedule;
import com.butter.wypl.schedule.domain.Schedule;

public interface MemberScheduleRepository extends JpaRepository<MemberSchedule, Integer> {

	List<MemberSchedule> findAllBySchedule(Schedule schedule);
}
