package com.butter.wypl.member.fixture;

import java.time.LocalDate;

import com.butter.wypl.member.domain.CalendarTimeZone;
import com.butter.wypl.member.domain.Member;

import lombok.Getter;

@Getter
public enum MemberFixture {
	KIM_JEONG_UK(LocalDate.of(1998, 11, 24), "workju1124@gmail.com", "김세이", null, "CA965C"),
	JO_DA_MIN(LocalDate.of(1999, 8, 6), "jdm080620@gmail.com", "댬니", null, "7F99D9"),
	JWA_SO_YEON(LocalDate.of(1998, 10, 5), "thdus981005@naver.com", "좌랑둥이", null, "0000FF"),
	CHOI_MIN_JUN(LocalDate.of(1994, 10, 14), "hitobi1014@gmail.com", "모코코", null, "34EB7A"),
	LEE_JI_WON(LocalDate.of(1997, 11, 4), "leeji7031@gmail.com", "뚱이", null, "4970FA"),
	HAN_JI_WON(LocalDate.of(1999, 8, 3), "jiwons0803@naver.com", "지롱이", null, "3FA9E6");

	private final LocalDate birthday;
	private final String email;
	private final String nickname;
	private final String image;
	private final String color;

	MemberFixture(LocalDate birthday, String email, String nickname, String image, String color) {
		this.birthday = birthday;
		this.email = email;
		this.nickname = nickname;
		this.image = image;
		this.color = color;
	}

	public Member toMember() {
		return Member.builder()
				.email(email)
				.nickname(nickname)
				.profileImage(image)
				.color(color)
				.timeZone(CalendarTimeZone.KOREA)
				.build();
	}
}
