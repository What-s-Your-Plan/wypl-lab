package com.butter.wypl.member.service;

import static com.butter.wypl.member.fixture.MemberFixture.*;
import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
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
import com.butter.wypl.member.data.response.FindMemberProfileInfoResponse;
import com.butter.wypl.member.data.response.FindTimezonesResponse;
import com.butter.wypl.member.domain.Member;
import com.butter.wypl.member.exception.MemberErrorCode;
import com.butter.wypl.member.exception.MemberException;
import com.butter.wypl.member.repository.MemberRepository;

@MockServiceTest
class MemberLoadServiceTest {
	@InjectMocks
	private MemberServiceImpl memberService;
	@Mock
	private MemberRepository memberRepository;

	private AuthMember authMember;

	@BeforeEach
	void setUp() {
		authMember = AuthMember.from(0);
	}

	@DisplayName("서버의 모든 타임존을 조회한다.")
	@Test
	void findAllTimezonesTest() {
		/* Given */
		Member member = KIM_JEONG_UK.toMember();
		given(memberRepository.findById(any(Integer.class)))
				.willReturn(Optional.of(member));

		/* When */
		FindTimezonesResponse response = memberService.findAllTimezones(authMember);

		/* Then */
		assertAll(
				() -> assertThat(response.memberTimeZone()).isNotNull(),
				() -> assertThat(response.timezones()).size().isNotZero()
		);
	}

	@DisplayName("회원 프로필 정보 조회 테스트")
	@Nested
	class FindProfileTest {
		@DisplayName("회원의 프로필 정보를 조회한다.")
		@Test
		void findProfileSuccessTest() {
			/* Given */
			Member member = KIM_JEONG_UK.toMember();
			given(memberRepository.findById(any(Integer.class)))
					.willReturn(Optional.of(member));

			/* When */
			FindMemberProfileInfoResponse response = memberService.findProfileInfo(authMember, authMember.getId());

			/* Then */
			assertAll(
					() -> assertThat(response.email()).isEqualTo(member.getEmail()),
					() -> assertThat(response.nickname()).isEqualTo(member.getNickname()),
					() -> assertThat(response.mainColor()).isEqualTo(member.getColor()),
					() -> assertThat(response.profileImage()).isEqualTo(member.getProfileImage())
			);
		}

		@DisplayName("프로필 조회 권한이 없으면 예외를 던진다.")
		@Test
		void validateOwnershipTest() {
			/* Given */
			int memberId = authMember.getId() + 1;

			/* When & Then */
			assertThatThrownBy(() -> memberService.findProfileInfo(authMember, memberId))
					.isInstanceOf(MemberException.class)
					.hasMessageContaining(MemberErrorCode.PERMISSION_DENIED.getMessage());
		}
	}
}