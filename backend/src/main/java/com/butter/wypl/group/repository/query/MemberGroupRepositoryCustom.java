package com.butter.wypl.group.repository.query;

import java.util.List;
import java.util.Optional;

import com.butter.wypl.group.domain.MemberGroup;

public interface MemberGroupRepositoryCustom {
	List<MemberGroup> findMemberGroupsByGroupId(int groupId);

	Optional<MemberGroup> findFirstPendingMemberGroupsByGroupId(int memberId, int groupId);
}
