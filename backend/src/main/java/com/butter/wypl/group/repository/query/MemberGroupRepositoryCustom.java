package com.butter.wypl.group.repository.query;

import java.util.List;
import java.util.Optional;

import com.butter.wypl.group.domain.MemberGroup;

public interface MemberGroupRepositoryCustom {
	List<MemberGroup> findAllMemberGroups(int groupId);

	List<MemberGroup> findAcceptedMemberGroups(int groupId);

	Optional<MemberGroup> findPendingMemberGroup(int memberId, int groupId);

	/**
	 * @param memberId 조회 요청한 회원의 식별자
	 *
	 * @hidden MemberGroup Fetch Join Member <p>
	 *     MemberGroup Fetch Join Group
	 */
	List<MemberGroup> findAllByMemberId(int memberId);
}
