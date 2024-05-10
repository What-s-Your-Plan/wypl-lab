package com.butter.wypl.group.service;

import static com.butter.wypl.group.utils.MemberGroupServiceUtils.*;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.butter.wypl.group.data.response.GroupDetailResponse;
import com.butter.wypl.group.data.response.GroupListByMemberIdResponse;
import com.butter.wypl.group.domain.Group;
import com.butter.wypl.group.repository.GroupRepository;
import com.butter.wypl.group.repository.MemberGroupRepository;
import com.butter.wypl.group.utils.GroupServiceUtils;
import com.butter.wypl.group.utils.MemberGroupServiceUtils;
import com.butter.wypl.member.repository.MemberRepository;
import com.butter.wypl.member.utils.MemberServiceUtils;

import lombok.RequiredArgsConstructor;

@Transactional(readOnly = true)
@Service
@RequiredArgsConstructor
public class GroupLoadServiceImpl implements GroupLoadService {

	private final GroupRepository groupRepository;

	private final MemberGroupRepository memberGroupRepository;
	private final MemberRepository memberRepository;

	@Override
	public GroupDetailResponse getDetailById(int userId, int groupId) {
		Group foundGroup = GroupServiceUtils.findById(groupRepository, groupId);

		MemberGroupServiceUtils.getMemberGroup(memberGroupRepository, userId,
			foundGroup.getId());

		return GroupDetailResponse.of(foundGroup, getMembersByGroupId(memberGroupRepository, groupId));
	}

	@Override
	public GroupListByMemberIdResponse getGroupListByMemberId(int memberId) {
		return GroupListByMemberIdResponse.from(MemberServiceUtils.findById(memberRepository, memberId));
	}

}
