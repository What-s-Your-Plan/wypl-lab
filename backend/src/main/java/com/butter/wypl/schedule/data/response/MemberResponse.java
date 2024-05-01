package com.butter.wypl.schedule.data.response;

import java.util.ArrayList;
import java.util.List;

import com.butter.wypl.member.domain.Member;
import com.fasterxml.jackson.annotation.JsonProperty;

public record MemberResponse(
	@JsonProperty("member_id")
	int memberId,

	String nickname
) {

	public static MemberResponse from(Member member) {
		return new MemberResponse(member.getId(), member.getNickname());
	}

	public static List<MemberResponse> from(List<Member> members) {
		List<MemberResponse> memberResponses = new ArrayList<>();

		for (Member member : members) {
			memberResponses.add(
				MemberResponse.from(member)
			);
		}

		return memberResponses;
	}

}
