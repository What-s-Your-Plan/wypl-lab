package com.butter.wypl.group.service;

import static com.butter.wypl.group.exception.GroupErrorCode.*;
import static com.butter.wypl.member.exception.MemberErrorCode.*;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.butter.wypl.global.exception.CustomErrorCode;
import com.butter.wypl.global.exception.CustomException;
import com.butter.wypl.group.data.request.GroupCreateRequest;
import com.butter.wypl.group.domain.Group;
import com.butter.wypl.group.exception.GroupException;
import com.butter.wypl.group.repository.GroupRepository;
import com.butter.wypl.group.repository.MemberGroupRepository;
import com.butter.wypl.member.domain.Member;
import com.butter.wypl.member.exception.MemberException;
import com.butter.wypl.member.repository.MemberRepository;
import com.butter.wypl.member.utils.MemberServiceUtils;

import lombok.RequiredArgsConstructor;

@Transactional(readOnly = true)
@Service
@RequiredArgsConstructor
public class GroupServiceImpl implements GroupModifyService, GroupLoadService {

	private final GroupRepository groupRepository;
	private final MemberRepository memberRepository;
	private final MemberGroupRepository memberGroupRepository;

	@Transactional
	@Override
	public int createGroup(int memberId, GroupCreateRequest createRequest) {

		createRequest.memberIdList().add(memberId);

		validateMaxMemberCount(createRequest);

		validateMemberIdList(createRequest);

		validateEachMemberGroupCountLimit(createRequest);

		Member groupOwner = MemberServiceUtils.findById(memberRepository, memberId);
		Group group = Group.of(createRequest.name(), createRequest.description(), groupOwner);

		Group savedGroup = groupRepository.save(group);

		for (Integer memberIdInGroup : createRequest.memberIdList()) {
			memberGroupRepository.save(memberIdInGroup, savedGroup.getId());
		}
		return savedGroup.getId();
	}

	private void validateMaxMemberCount(GroupCreateRequest createRequest) {
		if (isExceedMaxMember(createRequest.memberIdList())) {
			throw new GroupException(EXCEED_MAX_MEMBER_COUNT);
		}
	}

	private void validateEachMemberGroupCountLimit(GroupCreateRequest createRequest) {
		createRequest.memberIdList().forEach(memberId -> {
			if (memberGroupRepository.countByMemberId(memberId) >= 50) {
				throw new CustomException(new CustomErrorCode(HttpStatus.BAD_REQUEST, "GROUP_CUSTOM",
					memberRepository.findById(memberId).get().getEmail() + "해당 맴버는 인당 최대 50개의 그룹 생성을 초과했습니다."));
			}
		});
	}

	private void validateMemberIdList(GroupCreateRequest createRequest) {
		for (Integer memberId : createRequest.memberIdList()) {
			if (!memberRepository.existsById(memberId)) {
				throw new MemberException(NOT_EXIST_MEMBER);
			}
		}
	}

	private boolean isExceedMaxMember(List<Integer> memberIdList) {
		return memberIdList.size() + 1 > 50;
	}

}
