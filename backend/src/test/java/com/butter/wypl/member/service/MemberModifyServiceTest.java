package com.butter.wypl.member.service;

import static com.butter.wypl.member.fixture.MemberFixture.*;
import static org.assertj.core.api.Assertions.*;
import static org.mockito.BDDMockito.*;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import com.butter.wypl.auth.domain.AuthMember;
import com.butter.wypl.global.annotation.MockServiceTest;
import com.butter.wypl.member.data.request.MemberBirthdayUpdateRequest;
import com.butter.wypl.member.data.request.MemberNicknameUpdateRequest;
import com.butter.wypl.member.data.request.MemberTimezoneUpdateRequest;
import com.butter.wypl.member.data.response.MemberBirthdayUpdateResponse;
import com.butter.wypl.member.data.response.MemberNicknameUpdateResponse;
import com.butter.wypl.member.data.response.MemberTimezoneUpdateResponse;
import com.butter.wypl.member.domain.CalendarTimeZone;
import com.butter.wypl.member.repository.MemberRepository;

@MockServiceTest
class MemberModifyServiceTest {

	@InjectMocks
	private MemberServiceImpl memberService;
	@Mock
	private MemberRepository memberRepository;

	private AuthMember authMember;

	@BeforeEach
	void setUp() {
		authMember = AuthMember.from(0);
	}

	@DisplayName("회원 수정 테스트")
	@Nested
	class MemberUpdateTest {

		@DisplayName("닉네임 수정 테스트")
		@Test
		void updateNicknameTest() {
			/* Given */
			given(memberRepository.findById(any(Integer.class)))
					.willReturn(Optional.of(KIM_JEONG_UK.toMember()));

			MemberNicknameUpdateRequest request = new MemberNicknameUpdateRequest("wypl");

			/* When */
			MemberNicknameUpdateResponse response = memberService.updateNickname(authMember, request);

			/* Then */
			assertThat(response.nickname()).isEqualTo(request.nickname());
		}

		@DisplayName("생일 수정 테스트")
		@Test
		void updateBirthdayTest() {
			/* Given */
			given(memberRepository.findById(any(Integer.class)))
					.willReturn(Optional.of(KIM_JEONG_UK.toMember()));

			MemberBirthdayUpdateRequest request = new MemberBirthdayUpdateRequest(KIM_JEONG_UK.getBirthday());

			/* When */
			MemberBirthdayUpdateResponse response = memberService.updateBirthday(authMember, request);

			/* Then */
			assertThat(response.birthday()).isEqualTo(request.birthday());
		}

		@DisplayName("회원의 타임존을 수정한다.")
		@Test
		void updateTimezoneTest() {
			/* Given */
			MemberTimezoneUpdateRequest request = new MemberTimezoneUpdateRequest(CalendarTimeZone.ENGLAND);
			given(memberRepository.findById(any(Integer.class)))
					.willReturn(Optional.of(KIM_JEONG_UK.toMember()));

			/* When */
			MemberTimezoneUpdateResponse response = memberService.updateTimezone(authMember, request);

			/* Then */
			assertThat(request.timeZone()).isEqualTo(response.timeZone());
		}
	}
}