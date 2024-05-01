package com.butter.wypl.sidetab.data.response;

import com.butter.wypl.sidetab.domain.SideTab;
import com.fasterxml.jackson.annotation.JsonProperty;

public record GoalUpdateResponse(
		@JsonProperty("goal_id")
		int goalId,
		@JsonProperty("content")
		String content
) {
	public static GoalUpdateResponse from(SideTab findSideTab) {
		return new GoalUpdateResponse(findSideTab.getId(), findSideTab.getGoal());
	}
}
