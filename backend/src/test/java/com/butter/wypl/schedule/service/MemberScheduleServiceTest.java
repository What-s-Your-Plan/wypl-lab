package com.butter.wypl.schedule.service;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.BDDMockito.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import com.butter.wypl.global.annotation.MockServiceTest;
import com.butter.wypl.member.domain.Member;
import com.butter.wypl.member.fixture.MemberFixture;
import com.butter.wypl.member.repository.MemberRepository;
import com.butter.wypl.schedule.data.response.MemberIdResponse;
import com.butter.wypl.schedule.data.response.MemberResponse;
import com.butter.wypl.schedule.domain.MemberSchedule;
import com.butter.wypl.schedule.domain.Schedule;
import com.butter.wypl.schedule.respository.MemberScheduleRepository;
import com.butter.wypl.schedule.respository.ScheduleRepository;

@MockServiceTest
public class MemberScheduleServiceTest {
	@InjectMocks
	private MemberScheduleService memberScheduleService;

	@Mock
	private MemberRepository memberRepository;

	@Mock
	private MemberScheduleRepository memberScheduleRepository;

	@Mock
	private ScheduleRepository scheduleRepository;

	private Schedule schedule;

	@Nested
	@DisplayName("생성")
	class create {
		@DisplayName("멤버-일정 생성")
		@Test
		void createMemberSchedule() {
			//given
			Member member1 = MemberFixture.JWA_SO_YEON.toMember();
			Member member2 = MemberFixture.JO_DA_MIN.toMember();

			List<MemberIdResponse> memberIdResponses = new ArrayList<>();
			memberIdResponses.add(new MemberIdResponse(1));
			memberIdResponses.add(new MemberIdResponse(2));

			given(memberRepository.findById(1))
				.willReturn(Optional.of(member1));
			given(memberRepository.findById(2))
				.willReturn(Optional.of(member2));

			given(memberScheduleRepository.saveAll(any()))
				.willReturn(List.of(
					MemberSchedule.builder()
						.member(member1)
						.schedule(schedule)
						.build(),
					MemberSchedule.builder()
						.member(member2)
						.schedule(schedule)
						.build()
				));

			//when
			List<MemberResponse> memberResponses =
				memberScheduleService.createMemberSchedule(schedule, memberIdResponses);

			//then
			assertThat(memberResponses.size()).isEqualTo(2);
			assertThat(memberResponses.get(0).nickname()).isEqualTo(member1.getNickname());
		}

	}

}
