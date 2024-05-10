package com.butter.wypl.group.data.response;

import java.util.List;

import com.butter.wypl.member.domain.Member;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

public record GroupListByMemberIdResponse(

	@JsonProperty("member_id")
	int id,

	String nickname,

	String email,

	@JsonProperty("group_count")
	@JsonInclude(JsonInclude.Include.NON_NULL)
	int groupCount,

	@JsonInclude(JsonInclude.Include.NON_NULL)
	List<GroupDetailResponse> groups

) {

	public static GroupListByMemberIdResponse from(Member member) { //memberGroups
		return new GroupListByMemberIdResponse(
			member.getId(),
			member.getNickname(),
			member.getEmail(),
			member.getMemberGroups().size(),
			member.getMemberGroups()
				.stream()
				.map(memberGroup -> GroupDetailResponse.from(memberGroup.getGroup()))
				.toList()
		);
	}

}
