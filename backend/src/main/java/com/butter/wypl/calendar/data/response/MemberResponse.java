package com.butter.wypl.calendar.data.response;

import com.butter.wypl.member.domain.Member;
import com.fasterxml.jackson.annotation.JsonProperty;

public record MemberResponse(

	@JsonProperty("member_id")
	int memberId,

	String nickname,

	String color //TODO : pull 받고 Color로 수정해야 됨
) {

	public static MemberResponse from(Member member) {
		return new MemberResponse(
			member.getId(),
			member.getNickname(),
			member.getColor()
		);
	}
}
