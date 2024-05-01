package com.butter.wypl.sidetab.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.butter.wypl.auth.domain.AuthMember;
import com.butter.wypl.member.domain.Member;
import com.butter.wypl.member.repository.MemberRepository;
import com.butter.wypl.member.utils.MemberServiceUtils;
import com.butter.wypl.sidetab.data.request.GoalUpdateRequest;
import com.butter.wypl.sidetab.data.response.GoalUpdateResponse;
import com.butter.wypl.sidetab.domain.SideTab;
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
	public GoalUpdateResponse updateGoal(
			final AuthMember authMember,
			final int sideTabId,
			final GoalUpdateRequest goalUpdateRequest
	) {
		Member findMember = MemberServiceUtils.findById(memberRepository, authMember.getId());
		SideTab findSideTab = SideTabServiceUtils.findById(sideTabRepository, sideTabId);
		MemberServiceUtils.validateOwnership(findMember, findSideTab.getMemberId());

		GoalWidget goalWidget = GoalWidget.from(goalUpdateRequest.content());
		findSideTab.updateGoal(goalWidget);

		return GoalUpdateResponse.from(findSideTab);
	}
}
