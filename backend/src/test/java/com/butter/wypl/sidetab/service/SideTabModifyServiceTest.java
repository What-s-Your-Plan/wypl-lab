package com.butter.wypl.sidetab.service;

import static com.butter.wypl.member.fixture.MemberFixture.*;
import static org.assertj.core.api.Assertions.*;
import static org.mockito.BDDMockito.*;

import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;

import com.butter.wypl.auth.domain.AuthMember;
import com.butter.wypl.global.annotation.MockServiceTest;
import com.butter.wypl.member.domain.Member;
import com.butter.wypl.member.repository.MemberRepository;
import com.butter.wypl.sidetab.data.request.GoalUpdateRequest;
import com.butter.wypl.sidetab.data.response.GoalWidgetResponse;
import com.butter.wypl.sidetab.domain.SideTab;
import com.butter.wypl.sidetab.repository.SideTabRepository;

@MockServiceTest
class SideTabModifyServiceTest {

	@InjectMocks
	private SideTabServiceImpl sideTabService;

	@Mock
	private MemberRepository memberRepository;

	@Mock
	private SideTabRepository sideTabRepository;

	private AuthMember authMember;

	@BeforeEach
	void setUp() {
		authMember = AuthMember.from(0);
	}

	@DisplayName("목표를 수정한다.")
	@Test
	void goalUpdateSuccessTest() {
		/* Given */
		String goalAsString = "새로운 목표";
		GoalUpdateRequest request = new GoalUpdateRequest(goalAsString);

		Member member = KIM_JEONG_UK.toMember();
		given(memberRepository.findById(anyInt()))
				.willReturn(Optional.of(member));

		SideTab sideTab = SideTab.from(member);
		given(sideTabRepository.findById(anyInt()))
				.willReturn(Optional.of(sideTab));

		/* When */
		GoalWidgetResponse response = sideTabService.updateGoal(authMember, 0, request);

		/* Then */
		assertThat(response.content()).isEqualTo(goalAsString);
	}
}