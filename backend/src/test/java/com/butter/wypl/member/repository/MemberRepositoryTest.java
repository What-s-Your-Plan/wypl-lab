package com.butter.wypl.member.repository;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.EnumSource;
import org.springframework.beans.factory.annotation.Autowired;

import com.butter.wypl.global.annotation.JpaRepositoryTest;
import com.butter.wypl.member.domain.Member;
import com.butter.wypl.member.fixture.MemberFixture;

@JpaRepositoryTest
class MemberRepositoryTest {

	@Autowired
	private MemberRepository memberRepository;

	@Nested
	@DisplayName("회원 저장 테스트")
	class saveTest {
		@DisplayName("회원을 데이터베이스에 저장한다.")
		@ParameterizedTest
		@EnumSource(value = MemberFixture.class)
		void saveByMemberTest(MemberFixture memberFixture) {
			/* Given */
			Member member = memberFixture.toMember();

			/* When */
			/* Then */
			assertThatCode(() -> {
				memberRepository.save(member);
			}).doesNotThrowAnyException();
		}

		@DisplayName("저장한 회원의 생성 시간은 존재한다.")
		@ParameterizedTest
		@EnumSource(value = MemberFixture.class)
		void existedByMemberCreatedAt(MemberFixture memberFixture) {
			/* Given */
			Member member = memberFixture.toMember();

			/* When */
			Member savedMember = memberRepository.save(member);

			/* Then */
			assertAll(
					() -> assertThat(savedMember.getCreatedAt()).isNotNull(),
					() -> assertThat(savedMember.getModifiedAt()).isNotNull()
			);
		}
	}
}