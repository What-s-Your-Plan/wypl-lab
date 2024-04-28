package com.butter.wypl.member.utils;

import static com.butter.wypl.member.fixture.MemberFixture.*;
import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.EnumSource;
import org.springframework.beans.factory.annotation.Autowired;

import com.butter.wypl.global.annotation.JpaRepositoryTest;
import com.butter.wypl.member.domain.Member;
import com.butter.wypl.member.exception.MemberErrorCode;
import com.butter.wypl.member.exception.MemberException;
import com.butter.wypl.member.fixture.MemberFixture;
import com.butter.wypl.member.repository.MemberRepository;

import jakarta.persistence.EntityManager;

@JpaRepositoryTest
class MemberServiceUtilsTest {

	@Autowired
	private MemberRepository memberRepository;

	@Autowired
	private EntityManager entityManager;

	@DisplayName("사용자 이메일 조회 테스트")
	@Nested
	class FindByEmailTest {
		@DisplayName("사용자 이메일로 조회에 성공한다.")
		@ParameterizedTest
		@EnumSource(MemberFixture.class)
		void findByEmailSuccessTest(MemberFixture memberFixture) {
			/* Given */
			memberRepository.save(memberFixture.toMember());
			entityManager.flush();
			entityManager.clear();

			/* When & Then */
			assertThatCode(() -> MemberServiceUtils.findByEmail(memberRepository, memberFixture.getEmail()))
					.doesNotThrowAnyException();
		}

		@DisplayName("사용자 이메일로 조회에 실패한다.")
		@Test
		void findByEmailFailedTest() {
			/* Given */
			memberRepository.save(KIM_JEONG_UK.toMember());
			entityManager.flush();
			entityManager.clear();

			/* When & Then */
			assertThatThrownBy(() -> MemberServiceUtils.findByEmail(memberRepository, HAN_JI_WON.getEmail()))
					.isInstanceOf(MemberException.class)
					.hasMessageContaining(MemberErrorCode.NOT_EXIST_MEMBER.getMessage());
		}
	}

	@DisplayName("사용자 식별자 조회 테스트")
	@Nested
	class FindByIdTest {
		@DisplayName("사용자 식별자로 조회에 성공한다.")
		@ParameterizedTest
		@EnumSource(MemberFixture.class)
		void findByIdSuccessTest(MemberFixture memberFixture) {
			/* Given */
			Member savedMember = memberRepository.save(memberFixture.toMember());
			entityManager.flush();
			entityManager.clear();

			/* When */
			Member findMember = MemberServiceUtils.findById(memberRepository, savedMember.getId());

			/* Then */
			assertAll(
					() -> assertThat(findMember.getId()).isEqualTo(savedMember.getId()),
					() -> assertThat(findMember.getEmail()).isEqualTo(savedMember.getEmail())
			);
		}

		@DisplayName("사용자 식별자로 조회에 실패한다.")
		@Test
		void findByIdFailedTest() {
			/* When & Then */
			assertThatThrownBy(() -> MemberServiceUtils.findById(memberRepository, 0))
					.isInstanceOf(MemberException.class)
					.hasMessageContaining(MemberErrorCode.NOT_EXIST_MEMBER.getMessage());
		}
	}
}