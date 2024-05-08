package com.butter.wypl.group.repository;

import static com.butter.wypl.group.fixture.GroupFixture.*;
import static com.butter.wypl.member.fixture.MemberFixture.*;
import static org.assertj.core.api.AssertionsForClassTypes.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.butter.wypl.global.annotation.JpaRepositoryTest;
import com.butter.wypl.group.domain.Group;
import com.butter.wypl.group.domain.MemberGroup;
import com.butter.wypl.member.domain.Member;
import com.butter.wypl.member.repository.MemberRepository;

@JpaRepositoryTest
class MemberGroupRepositoryTest {

	@Autowired
	private MemberGroupRepository memberGroupRepository;

	@Autowired
	private MemberRepository memberRepository;

	@Autowired
	private GroupRepository groupRepository;

	@Test
	void countByMemberId() {
	}

	@Test
	@DisplayName("맴버그룹 저장 성공")
	void save() {
		
		/* Given */
		Member savedOwner = memberRepository.save(KIM_JEONG_UK.toMember());
		Member member = memberRepository.save(CHOI_MIN_JUN.toMember());
		assertThat(savedOwner.getId()).isNotNull();

		Group savedGroup = groupRepository.save(GROUP_STUDY.toGroup(savedOwner));
		assertThat(savedGroup.getId()).isNotNull();

		MemberGroup memberGroup = MemberGroup.of(member, savedGroup);

		/* When, Then */
		assertThatCode(() -> {
			memberGroupRepository.save(memberGroup);
		}).doesNotThrowAnyException();
	}
}