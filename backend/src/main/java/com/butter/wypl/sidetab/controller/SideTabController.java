package com.butter.wypl.sidetab.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.butter.wypl.auth.annotation.Authenticated;
import com.butter.wypl.auth.domain.AuthMember;
import com.butter.wypl.global.common.Message;
import com.butter.wypl.sidetab.data.request.GoalUpdateRequest;
import com.butter.wypl.sidetab.data.response.GoalWidgetResponse;
import com.butter.wypl.sidetab.service.SideTabLoadService;
import com.butter.wypl.sidetab.service.SideTabModifyService;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@RequestMapping("/side")
@RestController
public class SideTabController {
	private final SideTabLoadService sideTabLoadService;
	private final SideTabModifyService sideTabModifyService;

	@PatchMapping("/v1/goals/{goal_id}")
	public ResponseEntity<Message<GoalWidgetResponse>> updateGoal(
			@PathVariable("goal_id") int sideTabId,
			@RequestBody GoalUpdateRequest goalUpdateRequest,
			@Authenticated AuthMember authMember
	) {
		GoalWidgetResponse response
				= sideTabModifyService.updateGoal(authMember, sideTabId, goalUpdateRequest);
		return ResponseEntity.ok(Message.withBody("목표를 수정했습니다", response));
	}

	@GetMapping("/v1/goals/{goal_id}")
	public ResponseEntity<Message<GoalWidgetResponse>> findGoal(
			@PathVariable("goal_id") int sideTabId,
			@Authenticated AuthMember authMember
	) {
		GoalWidgetResponse response = sideTabLoadService.findGoal(authMember, sideTabId);
		return ResponseEntity.ok(Message.withBody("목표를 조회했습니다", response));
	}
}
