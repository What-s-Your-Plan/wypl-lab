package com.butter.wypl.sidetab.service;

import com.butter.wypl.auth.domain.AuthMember;
import com.butter.wypl.sidetab.data.request.GoalUpdateRequest;
import com.butter.wypl.sidetab.data.response.GoalUpdateResponse;

public interface SideTabModifyService {
	GoalUpdateResponse updateGoal(
			final AuthMember authMember,
			final int sideTabId,
			final GoalUpdateRequest goalUpdateRequest
	);
}
