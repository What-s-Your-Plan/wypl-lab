package com.butter.wypl.group.repository.query;

import java.util.List;
import java.util.Optional;

import com.butter.wypl.group.domain.MemberGroup;

public interface MemberGroupRepositoryCustom {
	List<MemberGroup> findAllMemberGroups(int groupId);

	List<MemberGroup> findAcceptedMemberGroups(int groupId);

	Optional<MemberGroup> findPendingMemberGroup(int memberId, int groupId);
}
