package com.butter.wypl.member.domain;

import java.time.LocalDate;

import com.butter.wypl.member.exception.MemberErrorCode;
import com.butter.wypl.member.exception.MemberException;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.MapsId;
import jakarta.persistence.OneToOne;
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
public class SideTab {
	@Id
	@Column(name = "member_id")
	private int id;

	@MapsId
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id")
	private Member member;

	@Column(name = "memo", length = 1_000)
	private String memo;

	@Column(name = "d_day")
	private LocalDate dDay;

	@Column(name = "goal", length = 60)
	private String goal;

	public void updateMemo(
			final String newMemo
	) {
		if (newMemo.length() > 1_000) {
			throw new MemberException(MemberErrorCode.TOO_LONG_CONTENT);
		}
		memo = newMemo;
	}
}
