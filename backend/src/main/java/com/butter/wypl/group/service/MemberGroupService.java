package com.butter.wypl.group.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.butter.wypl.group.domain.MemberGroup;
import com.butter.wypl.group.repository.MemberGroupRepository;
import com.butter.wypl.schedule.data.response.MemberResponse;

import lombok.RequiredArgsConstructor;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberGroupService {

	private final MemberGroupRepository memberGroupRepository;

	public List<MemberResponse> getMembersByGroupId(int groupId) {
		List<MemberGroup> memberGroups = memberGroupRepository.findMemberGroupsByGroupId(groupId);
		return memberGroups.stream()
			.map(MemberGroup::getMember)
			.map(MemberResponse::from)
			.toList();
	}

}
