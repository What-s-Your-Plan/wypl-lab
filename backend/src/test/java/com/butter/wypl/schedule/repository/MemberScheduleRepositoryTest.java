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
		member = memberRepository.save(MemberFixture.JWA_SO_YEON.toMember());
		schedule = scheduleRepository.save(ScheduleFixture.PERSONAL_EXERCISE_SCHEDULE.toScheduleRequest().toEntity());
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
}
