package com.butter.wypl.global.member.domain;

import java.time.LocalDate;

import com.butter.wypl.global.common.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
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

	@Column(name = "birthday")
	private LocalDate birthday;

	@Column(name = "nickname", length = 10, nullable = false)
	private String nickname;

	@Column(name = "profile_image", length = 100)
	private String profileImage;

	@Column(name = "color", length = 6, nullable = false)
	private String color;
}
