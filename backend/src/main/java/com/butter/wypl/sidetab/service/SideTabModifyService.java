package com.butter.wypl.sidetab.service;

import com.butter.wypl.auth.domain.AuthMember;
import com.butter.wypl.sidetab.data.request.DDayUpdateRequest;
import com.butter.wypl.sidetab.data.request.GoalUpdateRequest;
import com.butter.wypl.sidetab.data.response.DDayWidgetResponse;
import com.butter.wypl.sidetab.data.response.GoalWidgetResponse;

public interface SideTabModifyService {
	GoalWidgetResponse updateGoal(
			final AuthMember authMember,
			final int goalId,
			final GoalUpdateRequest request
	);

	DDayWidgetResponse updateDDay(
			final AuthMember authMember,
			final int dDayId,
			final DDayUpdateRequest request
	);
}
