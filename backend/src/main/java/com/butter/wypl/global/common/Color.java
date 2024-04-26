package com.butter.wypl.global.common;

import com.butter.wypl.label.exception.LabelErrorCode;
import com.butter.wypl.label.exception.LabelException;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Embeddable
public class Color {

	@Column(name = "color", length = 6)
	private String color;

	public Color(String color) {
		this.color = color;
	}

	public static Color from(final String color) {
		validate(color);
		return new Color(color);
	}

	private static void validate(final String color) {
		if (color == null || !color.matches("^[0-9A-Fa-f]{6}$")) {
			throw new LabelException(LabelErrorCode.NOT_APPROPRIATE_COLOR_CODE);
		}
	}
}
