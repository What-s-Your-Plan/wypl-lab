package com.butter.wypl.schedule.repository;

import static org.assertj.core.api.Assertions.*;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.butter.wypl.global.annotation.JpaRepositoryTest;
import com.butter.wypl.member.domain.Member;
import com.butter.wypl.member.fixture.MemberFixture;
import com.butter.wypl.member.repository.MemberRepository;
import com.butter.wypl.schedule.domain.MemberSchedule;
import com.butter.wypl.schedule.domain.Schedule;
import com.butter.wypl.schedule.fixture.ScheduleFixture;
import com.butter.wypl.schedule.respository.MemberScheduleRepository;
import com.butter.wypl.schedule.respository.ScheduleRepository;

@JpaRepositoryTest
public class MemberScheduleRepositoryTest {

	private final MemberScheduleRepository memberScheduleRepository;

	private final MemberRepository memberRepository;

	private final ScheduleRepository scheduleRepository;

	Schedule schedule;
	Member member;

	@Autowired
	public MemberScheduleRepositoryTest(MemberScheduleRepository memberScheduleRepository,
		MemberRepository memberRepository, ScheduleRepository scheduleRepository) {
		this.memberScheduleRepository = memberScheduleRepository;
		this.memberRepository = memberRepository;
		this.scheduleRepository = scheduleRepository;
	}

	@BeforeEach
	void init() {
		member = memberRepository.save(MemberFixture.JWA_SO_YEON.toMemberWithId(1));
		schedule = scheduleRepository.save(ScheduleFixture.PERSONAL_SCHEDULE.toSchedule());
	}

	@Test
	@DisplayName("멤버-회원 생성")
	void create() {
		// Given
		MemberSchedule memberSchedule = MemberSchedule.builder()
			.schedule(schedule)
			.member(member)
			.build();

		// When
		MemberSchedule savedMemberSchedule = memberScheduleRepository.save(memberSchedule);

		// Then
		assertThat(savedMemberSchedule).isNotNull();
		assertThat(savedMemberSchedule.getMember()).isEqualTo(memberSchedule.getMember());
		assertThat(savedMemberSchedule.getSchedule()).isEqualTo(memberSchedule.getSchedule());
	}
	//
	// @Test
	// @DisplayName("캘린더 일정 목록 조회")
	// void getCalendarSchedules() {
	// 	// Given
	// 	MemberSchedule memberSchedule = MemberSchedule.builder()
	// 		.schedule(schedule)
	// 		.member(member)
	// 		.build();
	//
	// 	Schedule schedule1 = ScheduleFixture.LABEL_PERSONAL_SCHEDULE.toSchedule();
	// 	MemberSchedule memberSchedule2 = MemberSchedule.builder()
	// 		.schedule(schedule1)
	// 		.member(member)
	// 		.build();
	//
	// 	memberScheduleRepository.saveAll(
	// 		List.of(memberSchedule, memberSchedule2)
	// 	);
	//
	// 	// When
	// 	List<Schedule> schedules = memberScheduleRepository.getCalendarSchedules(
	// 		1,
	// 		LocalDateTime.of(2024, 4, 25, 0, 0),
	// 		LocalDateTime.of(2024, 4, 27, 0, 0)
	// 	);
	//
	// 	// Then
	// 	assertThat(schedules.size()).isEqualTo(2);
	//
	// }
}
