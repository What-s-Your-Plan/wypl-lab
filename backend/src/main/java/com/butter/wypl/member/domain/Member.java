package com.butter.wypl.member.domain;

import java.time.LocalDate;

import com.butter.wypl.global.common.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Builder
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Member extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "member_id")
	private int id;

	@Column(name = "email", length = 50, unique = true, nullable = false)
	private String email;

	@Column(name = "birthday")
	private LocalDate birthday;

	@Column(name = "nickname", length = 20, nullable = false)
	private String nickname;

	@Column(name = "profile_image", length = 100)
	private String profileImage;

	@Column(name = "color", length = 6, nullable = false)
	private String color;

	@Enumerated(EnumType.STRING)
	@Column(name = "timezone", length = 10, nullable = false)
	private CalendarTimeZone timeZone;

	public void changeNickname(final String newNickname) {
		this.nickname = newNickname;
	}
}
