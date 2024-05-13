package com.butter.wypl.group.repository.query;

import static com.butter.wypl.group.domain.QGroup.*;
import static com.butter.wypl.group.domain.QMemberGroup.*;
import static com.butter.wypl.member.domain.QMember.*;

import java.util.List;
import java.util.Optional;

import com.butter.wypl.group.domain.GroupInviteState;
import com.butter.wypl.group.domain.MemberGroup;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
public class MemberGroupRepositoryCustomImpl implements MemberGroupRepositoryCustom {

	private final JPAQueryFactory query;

	@Override
	public Optional<MemberGroup> findFirstPendingMemberGroupsByGroupId(int memberId, int groupId) {
		MemberGroup findMemberGroup = query.selectFrom(memberGroup)
			.join(memberGroup.member, member).fetchJoin()
			.join(memberGroup.group, group).fetchJoin()
			.where(group.id.eq(groupId)
				.and(member.id.eq(memberId))
				.and(memberGroup.groupInviteState.eq(GroupInviteState.PENDING))
				.and(member.deletedAt.isNull()))
			.fetchFirst();
		return Optional.ofNullable(findMemberGroup);
	}

	@Override
	public List<MemberGroup> findMemberGroupsByGroupId(int groupId) {
		return query.selectFrom(memberGroup)
			.join(memberGroup.member, member).fetchJoin()
			.join(memberGroup.group, group).fetchJoin()
			.where(group.id.eq(groupId)
				.and(memberGroup.groupInviteState.eq(GroupInviteState.ACCEPTED))
				.and(member.deletedAt.isNull()))
			.fetch();
	}
}
