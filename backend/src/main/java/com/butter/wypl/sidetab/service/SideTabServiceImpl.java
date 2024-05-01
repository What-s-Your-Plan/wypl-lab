package com.butter.wypl.sidetab.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.butter.wypl.auth.domain.AuthMember;
import com.butter.wypl.member.domain.Member;
import com.butter.wypl.member.repository.MemberRepository;
import com.butter.wypl.member.utils.MemberServiceUtils;
import com.butter.wypl.sidetab.data.request.DDayUpdateRequest;
import com.butter.wypl.sidetab.data.request.GoalUpdateRequest;
import com.butter.wypl.sidetab.data.response.DDayWidgetResponse;
import com.butter.wypl.sidetab.data.response.GoalWidgetResponse;
import com.butter.wypl.sidetab.domain.SideTab;
import com.butter.wypl.sidetab.domain.embedded.DDayWidget;
import com.butter.wypl.sidetab.domain.embedded.GoalWidget;
import com.butter.wypl.sidetab.repository.SideTabRepository;
import com.butter.wypl.sidetab.utils.SideTabServiceUtils;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class SideTabServiceImpl implements SideTabLoadService, SideTabModifyService {
	private final SideTabRepository sideTabRepository;
	private final MemberRepository memberRepository;

	@Transactional
	@Override
	public GoalWidgetResponse updateGoal(
			final AuthMember authMember,
			final int goalId,
			final GoalUpdateRequest goalUpdateRequest
	) {
		SideTab findSideTab = findSideTabWidget(authMember, goalId);

		GoalWidget goalWidget = GoalWidget.from(goalUpdateRequest.content());
		findSideTab.updateGoal(goalWidget);

		return GoalWidgetResponse.from(findSideTab);
	}

	@Override
	public GoalWidgetResponse findGoal(
			final AuthMember authMember,
			final int goalId
	) {
		SideTab findSideTab = findSideTabWidget(authMember, goalId);

		return GoalWidgetResponse.from(findSideTab);
	}

	@Transactional
	@Override
	public DDayWidgetResponse updateDDay(
			final AuthMember authMember,
			final int dDayId,
			final DDayUpdateRequest request
	) {
		SideTab findSideTab = findSideTabWidget(authMember, dDayId);

		DDayWidget dDayWidget = DDayWidget.of(request.title(), request.date());
		findSideTab.updateDDay(dDayWidget);

		return DDayWidgetResponse.from(findSideTab.getDDay());
	}

	private SideTab findSideTabWidget(AuthMember authMember, int dDayId) {
		Member findMember = MemberServiceUtils.findById(memberRepository, authMember.getId());
		SideTab findSideTab = SideTabServiceUtils.findById(sideTabRepository, dDayId);
		MemberServiceUtils.validateOwnership(findMember, findSideTab.getMemberId());
		return findSideTab;
	}
}
