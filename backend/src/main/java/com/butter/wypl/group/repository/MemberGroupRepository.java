package com.butter.wypl.group.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.butter.wypl.group.domain.MemberGroup;
import com.butter.wypl.group.domain.MemberGroupId;

public interface MemberGroupRepository extends JpaRepository<MemberGroup, MemberGroupId> {

	@Query("SELECT COUNT(mg) FROM MemberGroup mg WHERE mg.member.id = :memberId")
	int countByMemberId(int memberId);

}
