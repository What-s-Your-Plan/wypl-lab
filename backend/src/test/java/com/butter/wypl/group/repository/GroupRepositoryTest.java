package com.butter.wypl.group.repository;

import static com.butter.wypl.global.common.Color.*;
import static com.butter.wypl.group.exception.GroupErrorCode.*;
import static com.butter.wypl.group.fixture.GroupFixture.*;
import static com.butter.wypl.member.fixture.MemberFixture.*;
import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.butter.wypl.global.annotation.JpaRepositoryTest;
import com.butter.wypl.group.domain.Group;
import com.butter.wypl.group.domain.MemberGroup;
import com.butter.wypl.group.exception.GroupException;
import com.butter.wypl.member.domain.Member;
import com.butter.wypl.member.repository.MemberRepository;

@JpaRepositoryTest
class GroupRepositoryTest {

	@Autowired
	GroupRepository groupRepository;

	@Autowired
	MemberRepository memberRepository;

	@Autowired
	MemberGroupRepository memberGroupRepository;

	@Nested
	@DisplayName("그룹 상세 조회 테스트")
	class getDetailByIdTest {

		@Test
		@DisplayName("그룹 상세 조회에 성공한다.")
		void whenSuccess() {
			/* Given */
			Member savedMember = memberRepository.save(HAN_JI_WON.toMember());
			Group savedGroup = groupRepository.save(GROUP_STUDY.toGroup(savedMember));
			MemberGroup memberGroup = memberGroupRepository.save(MemberGroup.of(savedMember, savedGroup, labelRed));


			/* When */
			Group foundGroup = groupRepository.findDetailById(savedGroup.getId())
				.orElseThrow(() -> new IllegalArgumentException("그룹이 존재하지 않습니다."));

			System.out.println(foundGroup.getId() + " " + foundGroup.getMemberGroups());

			/* Then */
			assertDoesNotThrow(() -> {
				assertThat(foundGroup.getName()).isEqualTo(GROUP_STUDY.getName());
				assertThat(foundGroup.getDescription()).isEqualTo(GROUP_STUDY.getDescription());

				assertNotNull(foundGroup.getOwner());
				assertThat(foundGroup.getOwner().getId());

			});

		}

		@Test
		@DisplayName("그룹 상세 조회에 실패한다.")
		void whenFail() {

			/* Given */
			int nonExistentGroupId = 123;
			/* When, Then */
			assertThatExceptionOfType(GroupException.class)
				.isThrownBy(() -> {
					groupRepository.findDetailById(nonExistentGroupId)
						.orElseThrow(() -> new GroupException(NOT_EXIST_GROUP));
				}).withMessageContaining(NOT_EXIST_GROUP.getMessage());

		}
	}

}