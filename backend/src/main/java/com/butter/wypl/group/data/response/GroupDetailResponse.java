package com.butter.wypl.group.data.response;

import java.util.List;

import com.butter.wypl.group.domain.Group;
import com.butter.wypl.group.domain.MemberGroup;
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
	public static GroupDetailResponse of(Group group) {
		MemberGroup ownerMemberGroup = group.getMemberGroups()
			.stream()
			.filter(MemberGroup::isOwner)
			.findFirst().orElse(null);

		return new GroupDetailResponse(
			group.getId(),
			group.getName(),
			group.getDescription(),
			MemberResponse.from(ownerMemberGroup),
			group.getMemberGroups().size(),
			MemberResponse.from(group.getMemberGroups())
		);
	}

	public static GroupDetailResponse from(MemberGroup memberGroup) {
		Group group = memberGroup.getGroup();
		MemberGroup ownerMemberGroup = group.getMemberGroups()
			.stream()
			.filter(MemberGroup::isOwner)
			.findFirst().orElse(null);

		return new GroupDetailResponse(
			group.getId(),
			group.getName(),
			group.getDescription(),
			MemberResponse.from(ownerMemberGroup),
			group.getMemberGroups().size(),
			MemberResponse.from(group.getMemberGroups())
		);
	}
}
