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

	// @Query("select s from MemberSchedule ms, ms.schedule s where ms.member.id = :member_id and s.startDate between :first_date and :last_date")
	// List<Schedule> getCalendarSchedules(
	// 	@Param("member_id") int memberId,
	// 	@Param("first_date") LocalDateTime firstDate,
	// 	@Param("last_date") LocalDateTime lastDate
	// );

}
