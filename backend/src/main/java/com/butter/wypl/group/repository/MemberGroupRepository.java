package com.butter.wypl.group.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.butter.wypl.group.domain.MemberGroup;
import com.butter.wypl.group.domain.MemberGroupId;
import com.butter.wypl.group.repository.query.MemberGroupRepositoryCustom;

public interface MemberGroupRepository extends JpaRepository<MemberGroup, MemberGroupId>,
		MemberGroupRepositoryCustom {

	@Query("SELECT COUNT(mg) FROM MemberGroup mg WHERE mg.member.id = :memberId")
	int countByMemberId(int memberId);

	/* TODO: QueryDSL 마이그레이션
	@Query("SELECT mg FROM MemberGroup mg "
			+ "JOIN FETCH mg.member m "
			+ "JOIN FETCH mg.group g "
			+ "WHERE mg.group.id = :groupId and mg.groupInviteState = 'ACCEPTED'")
	List<MemberGroup> findMemberGroupsByGroupId(int groupId);

	@Query("SELECT mg FROM MemberGroup mg "
			+ "JOIN FETCH mg.member m "
			+ "JOIN FETCH mg.group g "
			+ "WHERE mg.group.id = :groupId "
			+ "and mg.member.id = :memberId "
			+ "and mg.groupInviteState = 'PENDING'")
	Optional<MemberGroup> findFirstPendingMemberGroupsByGroupId(int memberId, int groupId);
	*/

	Optional<MemberGroup> findMemberGroupByMemberIdAndGroupId(int memberId, int groupId);

}
