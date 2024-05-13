package com.butter.wypl.group.data.response;

import java.util.List;

import com.butter.wypl.group.domain.MemberGroup;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonProperty;

public record MemberResponse(

	@JsonProperty("member_id")
	int memberId,

	String email,

	String nickname,

	@JsonProperty("profile_image")
	@JsonInclude(JsonInclude.Include.NON_NULL)
	String profileImage,

	@JsonProperty("group_invite_state")
	String GroupInviteState

) {

	public static MemberResponse from(MemberGroup memberGroup) {
		return new MemberResponse(
			memberGroup.getMember().getId()
			, memberGroup.getMember().getEmail()
			, memberGroup.getMember().getNickname()
			, memberGroup.getMember().getProfileImage()
			, memberGroup.getGroupInviteState().name());
	}

	public static List<MemberResponse> from(List<MemberGroup> memberGroups) {
		return memberGroups.stream().map(MemberResponse::from)
			.toList();
	}
}
