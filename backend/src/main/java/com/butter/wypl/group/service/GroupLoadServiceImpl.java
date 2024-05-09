package com.butter.wypl.group.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.butter.wypl.group.data.response.GroupDetailResponse;
import com.butter.wypl.group.domain.Group;
import com.butter.wypl.group.exception.GroupErrorCode;
import com.butter.wypl.group.exception.GroupException;
import com.butter.wypl.group.repository.GroupRepository;
import com.butter.wypl.group.repository.MemberGroupRepository;
import com.butter.wypl.group.utils.MemberGroupServiceUtils;
import com.butter.wypl.member.domain.Member;

import lombok.RequiredArgsConstructor;

@Transactional(readOnly = true)
@Service
@RequiredArgsConstructor
public class GroupLoadServiceImpl implements GroupLoadService {

	private final GroupRepository groupRepository;

	private final MemberGroupRepository memberGroupRepository;

	@Override
	public GroupDetailResponse getDetailById(int groupId) {

		Group foundGroup = groupRepository.findDetailById(groupId)
			.orElseThrow(() -> new GroupException(GroupErrorCode.NOT_EXIST_GROUP));

		List<Member> members = MemberGroupServiceUtils.getMemberResponsesByGroupId(
			memberGroupRepository, groupId);

		return GroupDetailResponse.from(foundGroup, members);

	}
}
