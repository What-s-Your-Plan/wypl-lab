package com.butter.wypl.schedule.respository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.butter.wypl.member.domain.Member;
import com.butter.wypl.schedule.domain.MemberSchedule;
import com.butter.wypl.schedule.domain.Schedule;

public interface MemberScheduleRepository extends JpaRepository<MemberSchedule, Integer> {

	Optional<MemberSchedule> findByScheduleAndMember(Schedule schedule, Member member);

	List<MemberSchedule> findAllBySchedule(Schedule schedule);
}
