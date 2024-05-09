package com.butter.wypl.group.utils;

import com.butter.wypl.global.annotation.Generated;
import com.butter.wypl.global.exception.CallConstructorException;
import com.butter.wypl.group.domain.Group;
import com.butter.wypl.group.exception.GroupErrorCode;
import com.butter.wypl.group.exception.GroupException;
import com.butter.wypl.group.repository.GroupRepository;

public class GroupServiceUtils {

	@Generated
	private GroupServiceUtils() {
		throw new CallConstructorException();
	}

	public static Group findById(
		final GroupRepository groupRepository,
		final int id
	) {
		return groupRepository.findById(id)
			.orElseThrow(() -> new GroupException(GroupErrorCode.NOT_EXIST_GROUP));
	}
}
