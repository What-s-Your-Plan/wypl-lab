package com.butter.wypl.group.utils;

import java.util.List;

import com.butter.wypl.global.annotation.Generated;
import com.butter.wypl.global.exception.CallConstructorException;
import com.butter.wypl.member.domain.Member;

public class GroupServiceUtils {

	@Generated
	private GroupServiceUtils() {
		throw new CallConstructorException();
	}

	public static boolean isGroupMember(int userId, List<Member> groupMembers) {
		return groupMembers.stream()
			.anyMatch(member -> member.getId() == userId);
	}
}
