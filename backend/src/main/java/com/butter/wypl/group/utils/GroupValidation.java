package com.butter.wypl.group.utils;

import java.util.List;

import com.butter.wypl.global.annotation.Generated;
import com.butter.wypl.global.exception.CallConstructorException;
import com.butter.wypl.group.exception.GroupErrorCode;
import com.butter.wypl.group.exception.GroupException;
import com.butter.wypl.member.domain.Member;

public class GroupValidation {

	@Generated
	private GroupValidation() {
		throw new CallConstructorException();
	}

	public static void validateGroupMember(int userId, List<Member> groupMembers) {
		if (!GroupServiceUtils.isGroupMember(userId, groupMembers)) {
			throw new GroupException(GroupErrorCode.IS_NOT_GROUP_MEMBER);
		}
	}
}
