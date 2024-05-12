package com.butter.wypl.group.data.response;

import java.util.List;

import com.butter.wypl.group.domain.Group;
import com.butter.wypl.group.domain.MemberGroup;
import com.butter.wypl.member.domain.Member;
import com.fasterxml.jackson.annotation.JsonProperty;

public record GroupDetailResponse(

	@JsonProperty("group_id")
	int id,

	String name,

	String description,

	MemberResponse owner,

	@JsonProperty("member_count")
	int memberCount,

	List<MemberResponse> members

) {
	public static GroupDetailResponse of(Group group, List<Member> members) {
		return new GroupDetailResponse(
			group.getId(),
			group.getName(),
			group.getDescription(),
			MemberResponse.from(group.getOwner()),
			group.getMemberGroups().size(),
			MemberResponse.from(members)
		);
	}

	public static GroupDetailResponse from(Group group) {
		return new GroupDetailResponse(
			group.getId(),
			group.getName(),
			group.getDescription(),
			MemberResponse.from(group.getOwner()),
			group.getMemberGroups().size(),
			MemberResponse.from(
				group.getMemberGroups().stream()
					.map(MemberGroup::getMember)
					.toList()
			)
		);
	}
}
