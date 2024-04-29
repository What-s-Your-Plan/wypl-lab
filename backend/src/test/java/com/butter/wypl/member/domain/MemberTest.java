package com.butter.wypl.member.domain;

import static com.butter.wypl.member.fixture.MemberFixture.*;
import static org.assertj.core.api.Assertions.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;

import com.butter.wypl.member.exception.MemberErrorCode;
import com.butter.wypl.member.exception.MemberException;

class MemberTest {

	@DisplayName("닉네임 Test")
	@Nested
	class NicknameTest {

		@DisplayName("닉네임 수정에 성공한다.")
		@ValueSource(ints = {1, 20})
		@ParameterizedTest
		void updateNicknameSuccessTest(int length) {
			/* Given */
			Member member = KIM_JEONG_UK.toMember();
			String newNickname = "a".repeat(length);

			/* When */
			member.changeNickname(newNickname);

			/* Then */
			assertThat(member.getNickname()).isEqualTo(newNickname);
		}

		@DisplayName("닉네임이 20자를 초과하면 예외를 던진다.")
		@ValueSource(ints = {21, 255})
		@ParameterizedTest
		void updateNicknameFailedTest(int length) {
			/* Given */
			Member member = KIM_JEONG_UK.toMember();
			String newNickname = "a".repeat(length);

			/* When & Then */
			assertThatThrownBy(() -> member.changeNickname(newNickname))
					.isInstanceOf(MemberException.class)
					.hasMessageContaining(MemberErrorCode.TOO_LONG_NICKNAME.getMessage());
		}

		@DisplayName("닉네임이 비어있으면 예외를 던진다.")
		@ParameterizedTest
		@ValueSource(strings = {"", " "})
		void nicknameIsNotEmpty(String newNickname) {
			/* Given */
			Member member = KIM_JEONG_UK.toMember();

			/* When & Then */
			assertThatThrownBy(() -> member.changeNickname(newNickname))
					.isInstanceOf(MemberException.class)
					.hasMessageContaining(MemberErrorCode.NICKNAME_IS_NOT_BLANK.getMessage());
		}

		@DisplayName("닉네임이 null이면 예외를 던진다.")
		@Test
		void nicknameIsNotNull() {
			/* Given */
			Member member = KIM_JEONG_UK.toMember();
			String newNickname = null;

			/* When & Then */
			assertThatThrownBy(() -> member.changeNickname(newNickname))
					.isInstanceOf(MemberException.class)
					.hasMessageContaining(MemberErrorCode.NICKNAME_IS_NOT_BLANK.getMessage());
		}
	}
}