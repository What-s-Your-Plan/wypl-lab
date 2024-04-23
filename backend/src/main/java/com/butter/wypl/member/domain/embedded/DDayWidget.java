package com.butter.wypl.member.domain.embedded;

import java.time.LocalDate;

import com.butter.wypl.member.exception.MemberErrorCode;
import com.butter.wypl.member.exception.MemberException;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Embeddable
public class DDayWidget {
	@Column(name = "title", length = 20)
	private String title;

	@Column(name = "d_day")
	private LocalDate value;

	private DDayWidget(
			final String title,
			final LocalDate value
	) {
		this.title = title;
		this.value = value;
	}

	public static DDayWidget of(
			final String title,
			final LocalDate value
	) {
		validateTitle(title);
		return new DDayWidget(title, value);
	}

	private static void validateTitle(final String newTitle) {
		if (newTitle == null) {
			return;
		}
		if (newTitle.length() > 20) {
			throw new MemberException(MemberErrorCode.TOO_LONG_CONTENT);
		}
	}
}
