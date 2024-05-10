package com.butter.wypl.group.service;

import static com.butter.wypl.global.common.Color.*;
import static com.butter.wypl.group.exception.GroupErrorCode.*;
import static com.butter.wypl.group.utils.GroupServiceUtils.findById;
import static com.butter.wypl.group.utils.GroupServiceUtils.*;
import static com.butter.wypl.group.utils.MemberGroupServiceUtils.*;
import static com.butter.wypl.member.exception.MemberErrorCode.*;
import static com.butter.wypl.member.utils.MemberServiceUtils.findById;

import java.util.List;
import java.util.Set;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.butter.wypl.global.common.BaseEntity;
import com.butter.wypl.global.exception.CustomErrorCode;
import com.butter.wypl.global.exception.CustomException;
import com.butter.wypl.group.data.request.GroupCreateRequest;
import com.butter.wypl.group.data.request.GroupUpdateRequest;
import com.butter.wypl.group.data.response.GroupIdResponse;
import com.butter.wypl.group.domain.Group;
import com.butter.wypl.group.domain.MemberGroup;
import com.butter.wypl.group.exception.GroupException;
import com.butter.wypl.group.repository.GroupRepository;
import com.butter.wypl.group.repository.MemberGroupRepository;
import com.butter.wypl.member.domain.Member;
import com.butter.wypl.member.exception.MemberException;
import com.butter.wypl.member.repository.MemberRepository;

import lombok.RequiredArgsConstructor;

@Transactional(readOnly = true)
@Service
@RequiredArgsConstructor
public class GroupModifyServiceImpl implements GroupModifyService {

	private final GroupRepository groupRepository;
	private final MemberRepository memberRepository;
	private final MemberGroupRepository memberGroupRepository;

	@Transactional
	@Override
	public GroupIdResponse createGroup(int memberId, GroupCreateRequest createRequest) {

		Member groupOwner = findById(memberRepository, memberId);

		createRequest.memberIdList().add(memberId);

		validateMaxMemberCount(createRequest);

		validateMemberIdList(createRequest);

		validateEachMemberGroupCountLimit(createRequest);

		Group group = Group.of(createRequest.name(), createRequest.description(), groupOwner);

		Group savedGroup = groupRepository.save(group);

		for (Integer memberIdInGroup : createRequest.memberIdList()) {
			Member foundMember = findById(memberRepository, memberIdInGroup);
			memberGroupRepository.save(MemberGroup.of(foundMember, savedGroup, labelYellow));
		}

		updateGroupInvitationStateOfOwner(memberId, savedGroup);

		return new GroupIdResponse(savedGroup.getId());
	}

	private void updateGroupInvitationStateOfOwner(int memberId, Group savedGroup) {
		MemberGroup ownerMemberGroup = memberGroupRepository.findMemberGroupByMemberIdAndGroupId(memberId,
				savedGroup.getId())
			.orElseThrow(() -> new GroupException(NOT_EXIST_MEMBER_GROUP));
		ownerMemberGroup.setGroupInviteStateAccepted();
	}

	@Transactional
	@Override
	public void updateGroup(int memberId, int groupId, GroupUpdateRequest updateRequest) {
		isGroupMember(memberId, getMembersByGroupId(memberGroupRepository, groupId));
		Group group = findById(groupRepository, groupId);
		group.updateGroupInfo(updateRequest.name(), updateRequest.description());
	}

	@Transactional
	@Override
	public void deleteGroup(int memberId, int groupId) {

		if (!isGroupOwner(groupRepository, memberId, groupId)) {
			throw new GroupException(IS_NOT_GROUP_OWNER);
		}

		// 그룹에 속한 맴버들을 삭제
		List<MemberGroup> findMemberGroups = getMemberGroupsByGroupId(memberGroupRepository, groupId);
		findMemberGroups.forEach(BaseEntity::delete);

		// 그룹 삭제
		Group findGroup = findById(groupRepository, groupId);
		findGroup.delete();
	}

	@Transactional
	@Override
	public void acceptGroupInvitation(int memberId, int groupId) {

		Member foundMember = findById(memberRepository, memberId);
		Group foundGroup = findById(groupRepository, groupId);

		MemberGroup memberGroup = memberGroupRepository.findFirstPendingMemberGroupsByGroupId(foundMember.getId(),
				foundGroup.getId())
			.orElseThrow(() -> new GroupException(NOT_EXIST_PENDING_MEMBER_GROUP));

		memberGroup.setGroupInviteStateAccepted();
	}

	@Transactional
	@Override
	public void rejectGroupInvitation(int memberId, int groupId) {

		Member foundMember = findById(memberRepository, memberId);
		Group foundGroup = findById(groupRepository, groupId);

		MemberGroup memberGroup = memberGroupRepository.findFirstPendingMemberGroupsByGroupId(foundMember.getId(),
				foundGroup.getId())
			.orElseThrow(() -> new GroupException(NOT_EXIST_PENDING_MEMBER_GROUP));

		memberGroupRepository.delete(memberGroup);
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

	private boolean isExceedMaxMember(Set<Integer> memberIdList) {
		return memberIdList.size() > 50;
	}

}
