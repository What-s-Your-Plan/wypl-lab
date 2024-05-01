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
import com.butter.wypl.sidetab.data.request.DDayUpdateRequest;
import com.butter.wypl.sidetab.data.request.GoalUpdateRequest;
import com.butter.wypl.sidetab.data.response.DDayWidgetResponse;
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

	@GetMapping("/v1/goals/{goal_id}")
	public ResponseEntity<Message<GoalWidgetResponse>> findGoal(
			@PathVariable("goal_id") int goalId,
			@Authenticated AuthMember authMember
	) {
		GoalWidgetResponse response = sideTabLoadService.findGoal(authMember, goalId);
		return ResponseEntity.ok(Message.withBody("목표를 조회했습니다", response));
	}

	@PatchMapping("/v1/goals/{goal_id}")
	public ResponseEntity<Message<GoalWidgetResponse>> updateGoal(
			@PathVariable("goal_id") int goalId,
			@RequestBody GoalUpdateRequest request,
			@Authenticated AuthMember authMember
	) {
		GoalWidgetResponse response
				= sideTabModifyService.updateGoal(authMember, goalId, request);
		return ResponseEntity.ok(Message.withBody("목표를 수정했습니다", response));
	}

	@PatchMapping("/v1/d-day/{d_day_id}")
	public ResponseEntity<Message<DDayWidgetResponse>> updateDDay(
			@PathVariable("d_day_id") int dDayId,
			@RequestBody DDayUpdateRequest request,
			@Authenticated AuthMember authMember
	) {
		DDayWidgetResponse response
				= sideTabModifyService.updateDDay(authMember, dDayId, request);
		return ResponseEntity.ok(Message.withBody("디데이를 수정했습니다", response));
	}
}
