package com.butter.wypl.group.service;

import static com.butter.wypl.global.common.Color.*;
import static com.butter.wypl.group.fixture.GroupFixture.*;
import static com.butter.wypl.member.exception.MemberErrorCode.*;
import static com.butter.wypl.member.fixture.MemberFixture.*;
import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.BDDMockito.*;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Optional;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;

import com.butter.wypl.global.annotation.MockServiceTest;
import com.butter.wypl.global.annotation.ServiceTest;
import com.butter.wypl.global.exception.CustomException;
import com.butter.wypl.group.data.request.GroupCreateRequest;
import com.butter.wypl.group.data.request.GroupUpdateRequest;
import com.butter.wypl.group.domain.Group;
import com.butter.wypl.group.domain.MemberGroup;
import com.butter.wypl.group.exception.GroupErrorCode;
import com.butter.wypl.group.exception.GroupException;
import com.butter.wypl.group.repository.GroupRepository;
import com.butter.wypl.group.repository.MemberGroupRepository;
import com.butter.wypl.group.utils.GroupServiceUtils;
import com.butter.wypl.member.domain.Member;
import com.butter.wypl.member.exception.MemberException;
import com.butter.wypl.member.repository.MemberRepository;

import jakarta.persistence.EntityManager;

@MockServiceTest
class GroupModifyServiceTest {

	@InjectMocks
	private GroupModifyServiceImpl groupModifyService;

	@Mock
	private GroupRepository groupRepository;

	@Mock
	private MemberRepository memberRepository;

	@Mock
	private MemberGroupRepository memberGroupRepository;

	@Test
	@DisplayName("그룹 생성 성공")
	void createGroupSuccess() {

		/* Given */
		int givenMemberId = 1;

		GroupCreateRequest givenGroupCreateRequest = new GroupCreateRequest("name", "description",
			new HashSet<>(Arrays.asList(2, 3)));

		// Mocking
		Member owner = HAN_JI_WON.toMember();
		given(memberRepository.findById(anyInt()))
			.willReturn(Optional.of(owner));

		given(memberRepository.existsById(anyInt()))
			.willReturn(true);

		given(memberGroupRepository.countByMemberId(anyInt()))
			.willReturn(49);

		Group group = Group.of(givenGroupCreateRequest.name(), givenGroupCreateRequest.description(), owner);
		given(groupRepository.save(any(Group.class)))
			.willReturn(group);

		/* When, Then */
		Assertions.assertThatCode(() -> {
			groupModifyService.createGroup(givenMemberId, givenGroupCreateRequest);
		}).doesNotThrowAnyException();
	}

	@Test
	@DisplayName("그룹 생성 실패: 최대 인원 초과")
	void createGroupFailOfExceedMaxNumberCount() {

		/* Given */
		int givenMemberId = 1;

		HashSet<Integer> memberIdList = new HashSet<>();
		for (int i = 1; i <= 51; i++) {
			memberIdList.add(i);
		}
		GroupCreateRequest givenGroupCreateRequest = new GroupCreateRequest("name", "description", memberIdList);

		/* When, Then */
		Assertions.assertThatThrownBy(() -> {
				groupModifyService.createGroup(givenMemberId, givenGroupCreateRequest);
			}).isInstanceOf(GroupException.class)
			.hasMessageContaining(GroupErrorCode.EXCEED_MAX_MEMBER_COUNT.getMessage());
	}

	@Test
	@DisplayName("그룹 생성 실패: 유효하지 않은 회원 ID 존재")
	void createGroupFailOfExistsNotInvalidMemberId() {
		/* Given */
		int givenMemberId = 1;

		GroupCreateRequest givenGroupCreateRequest = new GroupCreateRequest("name", "description",
			new HashSet<>(Arrays.asList(2, 3)));

		// Mocking
		given(memberRepository.existsById(anyInt()))
			.willReturn(false);

		/* When, Then */
		Assertions.assertThatThrownBy(() -> {
				groupModifyService.createGroup(givenMemberId, givenGroupCreateRequest);
			}).isInstanceOf(MemberException.class)
			.hasMessageContaining(NOT_EXIST_MEMBER.getMessage());
	}

	@Test
	@DisplayName("그룹 생성 실패: 그룹 인원 중 그룹 갯수 초과 회원 존재")
	void createGroupFailOfExistsMemberExceedingGroupCountLimit() {

		/* Given */
		int givenMemberId = 1;

		GroupCreateRequest givenGroupCreateRequest = new GroupCreateRequest("name", "description",
			new HashSet<>(Arrays.asList(2, 3)));

		// Mocking
		Member owner = HAN_JI_WON.toMember();
		given(memberRepository.findById(anyInt()))
			.willReturn(Optional.of(owner));

		given(memberRepository.existsById(anyInt()))
			.willReturn(true);

		given(memberGroupRepository.countByMemberId(anyInt()))
			.willReturn(50);

		/* When, Then */
		Assertions.assertThatThrownBy(() -> {
				groupModifyService.createGroup(givenMemberId, givenGroupCreateRequest);
			}).isInstanceOf(CustomException.class)
			.hasMessageContaining("해당 맴버는 인당 최대 50개의 그룹 생성을 초과했습니다.");
	}

	@ServiceTest
	@Nested
	@DisplayName("그룹 수정 테스트")
	class updateGroupTest {

		@Autowired
		private GroupModifyService groupModifyService;

		@Autowired
		private MemberRepository memberRepository;

		@Autowired
		private GroupRepository groupRepository;

		@Autowired
		private MemberGroupRepository memberGroupRepository;

		@Autowired
		private EntityManager em;

		@Test
		@DisplayName("그룹 수정 성공")
		void whenSuccess() {

			/* Given */
			Member member = memberRepository.save(HAN_JI_WON.toMember());
			Group group = groupRepository.save(
				Group.of(GROUP_STUDY.getName(), GROUP_STUDY.getDescription(), member));
			memberGroupRepository.save(MemberGroup.of(member, group, labelYellow));

			em.flush();
			em.clear();

			String modifyGroupName = "변경된 그룹명";
			String modifyGroupDescription = "변경된 그룹 설명";

			GroupUpdateRequest updateRequest = new GroupUpdateRequest(modifyGroupName,
				modifyGroupDescription);

			/* When */
			groupModifyService.updateGroup(member.getId(), group.getId(), updateRequest);
			Group updatedGroup = GroupServiceUtils.findById(groupRepository, group.getId());

			/* Then */
			assertEquals(modifyGroupName, updatedGroup.getName());
			assertEquals(modifyGroupDescription, updatedGroup.getDescription());

		}

		@Test
		@DisplayName("그룹 수정 실패 : 그룹 맴버의 요청이 아닌 경우")
		void whenFail() {

			/* Given */
			Member member = memberRepository.save(HAN_JI_WON.toMember());
			Group group = groupRepository.save(
				Group.of(GROUP_STUDY.getName(), GROUP_STUDY.getDescription(), member));

			em.flush();
			em.clear();

			String modifyGroupName = "변경된 그룹명";
			String modifyGroupDescription = "변경된 그룹 설명";

			GroupUpdateRequest updateRequest = new GroupUpdateRequest(modifyGroupName,
				modifyGroupDescription);

			/* When, Then */
			Assertions.assertThatThrownBy(() -> {
					groupModifyService.updateGroup(member.getId() + 1, group.getId(), updateRequest);
				}).isInstanceOf(GroupException.class)
				.hasMessageContaining(GroupErrorCode.IS_NOT_GROUP_MEMBER.getMessage());

		}

	}

}