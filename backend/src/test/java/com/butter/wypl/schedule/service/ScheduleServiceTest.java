package com.butter.wypl.schedule.service;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.BDDMockito.*;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import com.butter.wypl.global.annotation.MockServiceTest;
import com.butter.wypl.label.domain.Label;
import com.butter.wypl.label.fixture.LabelFixture;
import com.butter.wypl.label.repository.LabelRepository;
import com.butter.wypl.member.domain.Member;
import com.butter.wypl.member.fixture.MemberFixture;
import com.butter.wypl.member.repository.MemberRepository;
import com.butter.wypl.schedule.data.request.ScheduleRequest;
import com.butter.wypl.schedule.data.response.ScheduleResponse;
import com.butter.wypl.schedule.domain.Category;
import com.butter.wypl.schedule.fixture.ScheduleFixture;
import com.butter.wypl.schedule.respository.ScheduleRepository;

@MockServiceTest
public class ScheduleServiceTest {

	@InjectMocks
	private ScheduleServiceImpl scheduleService;

	@Mock
	private LabelRepository labelRepository;

	@Mock
	private MemberRepository memberRepository;
	@Mock
	private ScheduleRepository scheduleRepository;
	@Mock
	private MemberScheduleService memberScheduleService;

	//라벨 미리 생성
	@BeforeEach
	void initLabel() {
		Label label = LabelFixture.STUDY_LABEL.toLabel();

		lenient().when(labelRepository.findByLabelId(anyInt()))
			.thenReturn(Optional.of(label));
	}

	//멤버 미리 생성
	private Member member1, member2;

	@BeforeEach
	void initMember() {
		member1 = MemberFixture.JWA_SO_YEON.toMember();
		member2 = MemberFixture.JO_DA_MIN.toMember();

		lenient().when(memberRepository.findById(1))
			.thenReturn(Optional.of(member1));
		lenient().when(memberRepository.findById(2))
			.thenReturn(Optional.of(member2));
	}

	@Nested
	@DisplayName("일정 등록")
	class create {

		@Test
		@DisplayName("반복 없는 개인 일정 등록이 정상적으로 이루어지는지 확인")
		void noRepeatPersonalSchedule() {
			//given
			ScheduleRequest scheduleRequest = ScheduleFixture.PERSONAL_EXERCISE_SCHEDULE.toScheduleRequest();
			lenient().when(scheduleRepository.save(any())).thenReturn(scheduleRequest.toEntity());

			//when
			ScheduleResponse result = scheduleService.createSchedule(1, scheduleRequest);

			//then
			assertThat(result).isNotNull();
			assertThat(result.ownerId()).isEqualTo(1);
			assertThat(result.title()).isEqualTo(scheduleRequest.title());
			assertThat(result.startDate()).isEqualTo(scheduleRequest.startDate());
			assertThat(result.endDate()).isEqualTo(scheduleRequest.endDate());
			assertThat(result.category()).isEqualTo(Category.MEMBER);
			assertThat(result.labelId()).isNull();
			assertThat(result.repetitionScheduleId()).isNull();
		}

		@Test
		@DisplayName("반복 있는 개인 일정 등록이 정상적으로 이루어지는지 확인")
		void repeatPersonalSchedule() {
			//given
			ScheduleRequest scheduleRequest = ScheduleFixture.PERSONAL_REPEAT_EXERCISE_SCHEDULE.toScheduleRequest();
			lenient().when(scheduleRepository.save(any())).thenReturn(scheduleRequest.toEntity());

			//when
			ScheduleResponse result = scheduleService.createSchedule(1, scheduleRequest);

			//then
			assertThat(result).isNotNull();
			assertThat(result.ownerId()).isEqualTo(1);
			assertThat(result.title()).isEqualTo(scheduleRequest.title());
			assertThat(result.startDate()).isEqualTo(scheduleRequest.startDate());
			assertThat(result.endDate()).isEqualTo(scheduleRequest.endDate());
			assertThat(result.category()).isEqualTo(Category.MEMBER);
			assertThat(result.labelId()).isNotNull();
			assertThat(result.repetitionScheduleId()).isEqualTo(result.scheduleId());
		}

		@Test
		@DisplayName("반복 없는 그룹 일정 저장 확인")
		void noRepeatGroupSchedule() {
			// Given

			// When

			// Then

		}

		@Test
		@DisplayName("그륩 일정 등록시 포함된 그룹이 아니면 에러")
		void groupScheduleException() {
			// Given

			// When

			// Then

		}
	}
}
