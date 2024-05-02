package com.butter.wypl.schedule.service;

import static org.assertj.core.api.Assertions.*;
import static org.mockito.BDDMockito.*;

import java.util.List;
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
import com.butter.wypl.schedule.data.request.ScheduleCreateRequest;
import com.butter.wypl.schedule.data.response.MemberIdResponse;
import com.butter.wypl.schedule.data.response.RepetitionResponse;
import com.butter.wypl.schedule.data.response.ScheduleResponse;
import com.butter.wypl.schedule.domain.Category;
import com.butter.wypl.schedule.domain.Repetition;
import com.butter.wypl.schedule.domain.Schedule;
import com.butter.wypl.schedule.fixture.ScheduleFixture;
import com.butter.wypl.schedule.fixture.embedded.RepetitionFixture;
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

	@Mock
	private RepetitionService repetitionService;

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

	@BeforeEach
	void initRepetition() {
		Repetition repetition = RepetitionFixture.MONTHLY_REPETITION.toRepetition();

		lenient().when(repetitionService.createRepetition(any())).thenReturn(repetition);
	}

	@Nested
	@DisplayName("일정 등록")
	class create {

		@Test
		@DisplayName("반복 없는 개인 일정 등록이 정상적으로 이루어지는지 확인")
		void noRepeatPersonalSchedule() {
			//given
			Schedule schedule = ScheduleFixture.PERSONAL_SCHEDULE.toSchedule();
			lenient().when(scheduleRepository.save(any()))
				.thenReturn(schedule);

			//when
			ScheduleResponse result = scheduleService.createSchedule(1,
				ScheduleCreateRequest.of(schedule, List.of(new MemberIdResponse(1)))
			);

			//then
			assertThat(result).isNotNull();
			assertThat(result.groupId()).isNull();
			assertThat(result.title()).isEqualTo(schedule.getTitle());
			assertThat(result.startDate()).isEqualTo(schedule.getStartDate());
			assertThat(result.endDate()).isEqualTo(schedule.getEndDate());
			assertThat(result.category()).isEqualTo(Category.MEMBER);
			assertThat(result.labelId()).isNull();
			assertThat(result.repetition()).isNull();
		}

		@Test
		@DisplayName("반복 있는 개인 일정 등록이 정상적으로 이루어지는지 확인")
		void repeatPersonalSchedule() {
			//given
			Schedule schedule = ScheduleFixture.REPEAT_PERSONAL_SCHEDULE.toSchedule();
			lenient().when(scheduleRepository.save(any()))
				.thenReturn(schedule);

			//when
			ScheduleResponse result = scheduleService.createSchedule(1,
				ScheduleCreateRequest.of(schedule, List.of(new MemberIdResponse(1))));

			//then
			assertThat(result).isNotNull();
			assertThat(result.groupId()).isNull();
			assertThat(result.title()).isEqualTo(schedule.getTitle());
			assertThat(result.startDate()).isEqualTo(schedule.getStartDate());
			assertThat(result.endDate()).isEqualTo(schedule.getEndDate());
			assertThat(result.category()).isEqualTo(Category.MEMBER);
			assertThat(result.labelId()).isNull();
			assertThat(result.repetition()).isEqualTo(RepetitionResponse.from(schedule.getRepetition()));
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

	@Nested
	@DisplayName("일정 조회")
	class get {
		
	}

	@Nested
	@DisplayName("일정 삭제")
	class delete {

	}
}
