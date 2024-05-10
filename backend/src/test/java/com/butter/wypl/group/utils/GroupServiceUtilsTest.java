package com.butter.wypl.group.utils;

import static com.butter.wypl.global.common.Color.*;
import static com.butter.wypl.group.fixture.GroupFixture.*;
import static com.butter.wypl.group.utils.GroupServiceUtils.*;
import static com.butter.wypl.member.fixture.MemberFixture.*;
import static org.assertj.core.api.AssertionsForClassTypes.*;
import static org.junit.jupiter.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.butter.wypl.global.annotation.JpaRepositoryTest;
import com.butter.wypl.group.domain.Group;
import com.butter.wypl.group.domain.MemberGroup;
import com.butter.wypl.group.exception.GroupErrorCode;
import com.butter.wypl.group.exception.GroupException;
import com.butter.wypl.group.repository.GroupRepository;
import com.butter.wypl.group.repository.MemberGroupRepository;
import com.butter.wypl.member.domain.Member;
import com.butter.wypl.member.repository.MemberRepository;

@JpaRepositoryTest
class GroupServiceUtilsTest {

	@Autowired
	private GroupRepository groupRepository;

	@Autowired
	private MemberRepository memberRepository;

	@Autowired
	private MemberGroupRepository memberGroupRepository;

	@Nested
	@DisplayName("그룹 맴버 여부 확인 테스트")
	class isGroupMemberTest {

		@Test
		@DisplayName("성공 : 그룹 맴버인 경우")
		void whenSuccess() {
			/* Given */
			Member savedMember = memberRepository.save(HAN_JI_WON.toMember());
			Group savedGroup = groupRepository.save(GROUP_STUDY.toGroup(savedMember));
			memberGroupRepository.save(MemberGroup.of(savedMember, savedGroup, labelYellow));
			List<Member> memberList = MemberGroupServiceUtils.getMembersByGroupId(memberGroupRepository,
				savedGroup.getId());

			/* When, Then */
			assertThatCode(() -> isGroupMember(savedMember.getId(), memberList))
				.doesNotThrowAnyException();

		}

	}

	@Nested
	@DisplayName("그룹 소유자 여부 확인 테스트")
	class isGroupOwnerTest {

		@Test
		@DisplayName("성공 : 그룹 소유자인 경우")
		void whenSuccess() {
			/* Given */
			Member savedMember = memberRepository.save(HAN_JI_WON.toMember());
			Group savedGroup = groupRepository.save(GROUP_STUDY.toGroup(savedMember));

			/* When, Then */
			assertThatCode(
				() -> isGroupOwner(groupRepository, savedMember.getId(), savedGroup.getId()))
				.doesNotThrowAnyException();

		}

		@Test
		@DisplayName("실패 : 그룹이 존재하지 않는 경우")
		void whenFailOfGroupISNotExist() {
			/* Given */
			Member groupMember = memberRepository.save(HAN_JI_WON.toMember());
			int otherGroupId = groupRepository.getGroupTotalCount() + 1;

			/* When, Then */
			assertThatCode(() -> findById(groupRepository, otherGroupId))
				.isInstanceOf(GroupException.class)
				.hasMessage(GroupErrorCode.NOT_EXIST_GROUP.getMessage());

		}

		@Test
		@DisplayName("실패 : 그룹 소유자가 아닌 경우")
		void whenFailOfNotOwner() {
			/* Given */
			Member savedMember = memberRepository.save(HAN_JI_WON.toMember());
			Group savedGroup = groupRepository.save(GROUP_STUDY.toGroup(savedMember));
			Member otherMember = memberRepository.save(KIM_JEONG_UK.toMember());

			/* When, Then */
			assertFalse(isGroupOwner(groupRepository, otherMember.getId(), savedGroup.getId()));
		}

	}

}