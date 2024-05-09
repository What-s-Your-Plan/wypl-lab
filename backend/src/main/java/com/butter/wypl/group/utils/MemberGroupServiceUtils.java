package com.butter.wypl.group.utils;

import java.util.List;

import com.butter.wypl.global.annotation.Generated;
import com.butter.wypl.global.exception.CallConstructorException;
import com.butter.wypl.group.domain.MemberGroup;
import com.butter.wypl.group.repository.MemberGroupRepository;
import com.butter.wypl.member.domain.Member;

public class MemberGroupServiceUtils {

	@Generated
	private MemberGroupServiceUtils() {
		throw new CallConstructorException();
	}

	public static List<Member> getMembersByGroupId(MemberGroupRepository memberGroupRepository,
		int groupId) {
		List<MemberGroup> memberGroups = memberGroupRepository.findMemberGroupsByGroupId(groupId);
		return memberGroups.stream()
			.map(MemberGroup::getMember)
			.toList();
	}
}
