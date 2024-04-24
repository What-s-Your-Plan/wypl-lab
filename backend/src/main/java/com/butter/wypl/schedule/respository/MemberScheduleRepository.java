package com.butter.wypl.schedule.respository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.butter.wypl.schedule.domain.MemberSchedule;

public interface MemberScheduleRepository extends JpaRepository<MemberSchedule, Integer> {
}
