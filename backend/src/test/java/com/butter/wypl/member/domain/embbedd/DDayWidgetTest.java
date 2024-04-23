package com.butter.wypl.member.domain.embbedd;

import static org.assertj.core.api.Assertions.*;

import java.time.LocalDate;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.EnumSource;
import org.junit.jupiter.params.provider.ValueSource;

import com.butter.wypl.member.exception.MemberErrorCode;
import com.butter.wypl.member.exception.MemberException;
import com.butter.wypl.member.fixture.SideTabFixture;

class DDayWidgetTest {

	@DisplayName("D-Day 위젯 생성에 성공한다.")
	@ParameterizedTest
	@EnumSource(value = SideTabFixture.class)
	void generateDDay(SideTabFixture sideTabFixture) {
		/* Given */
		String title = sideTabFixture.getTitle();
		LocalDate dDay = sideTabFixture.getDDay();

		/* When */
		/* Then */
		assertThatCode(() -> {
			DDayWidget dDayWidget = DDayWidget.of(title, dDay);
			assertThat(dDayWidget.getTitle()).isEqualTo(title);
			assertThat(dDayWidget.getValue()).isEqualTo(dDay);
		}).doesNotThrowAnyException();
	}

	@DisplayName("목표 Length Test")
	@Nested
	class MemoLengthTest {
		@DisplayName("D-Day 제목의 길이가 20이하이면 예외를 던지지 않는다.")
		@ParameterizedTest
		@ValueSource(ints = {0, 20})
		void generateMemoLength(int length) {
			/* Given */
			String dDayTitleAsString = "a".repeat(length);

			/* When */
			/* Then */
			assertThatCode(() -> {
				DDayWidget dDayWidget = DDayWidget.of(dDayTitleAsString, null);
				assertThat(dDayWidget.getTitle()).isEqualTo(dDayTitleAsString);
			}).doesNotThrowAnyException();
		}

		@DisplayName("D-Day 제목의 길이가 20초과이면 예외를 던진다.")
		@Test
		void validateTooLongContent() {
			/* Given */
			String dDayTitleAsString = "a".repeat(21);

			/* When */
			/* Then */
			assertThatThrownBy(() -> DDayWidget.of(dDayTitleAsString, null))
					.isInstanceOf(MemberException.class)
					.hasMessageContaining(MemberErrorCode.TOO_LONG_CONTENT.getMessage());
		}
	}
}