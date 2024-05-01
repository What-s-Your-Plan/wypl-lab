package com.butter.wypl.sidetab.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.butter.wypl.auth.domain.AuthMember;
import com.butter.wypl.sidetab.data.request.GoalUpdateRequest;
import com.butter.wypl.sidetab.data.response.GoalUpdateResponse;
import com.butter.wypl.sidetab.repository.SideTabRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class SideTabServiceImpl implements SideTabLoadService, SideTabModifyService {
	private final SideTabRepository sideTabRepository;

	@Transactional
	@Override
	public GoalUpdateResponse updateGoal(
			final AuthMember authMember,
			final int sideTabId,
			final GoalUpdateRequest goalUpdateRequest
	) {
		return null;
	}
}
