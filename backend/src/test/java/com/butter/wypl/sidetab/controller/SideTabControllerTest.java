package com.butter.wypl.sidetab.controller;

import static com.epages.restdocs.apispec.MockMvcRestDocumentationWrapper.*;
import static org.mockito.BDDMockito.*;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.ResultActions;

import com.butter.wypl.auth.domain.AuthMember;
import com.butter.wypl.global.common.ControllerTest;
import com.butter.wypl.sidetab.data.request.GoalUpdateRequest;
import com.butter.wypl.sidetab.data.response.GoalUpdateResponse;
import com.butter.wypl.sidetab.service.SideTabLoadService;
import com.butter.wypl.sidetab.service.SideTabModifyService;

class SideTabControllerTest extends ControllerTest {

	@Autowired
	private SideTabController sideTabController;

	@MockBean
	private SideTabModifyService sideTabModifyService;
	@MockBean
	private SideTabLoadService sideTabLoadService;

	@DisplayName("사이드탭의 목표를 수정한다.")
	@Test
	void updateSideTabGoalTest() throws Exception {
		/* Given */
		String goalAsString = "새로운 목표";
		String json = convertToJson(new GoalUpdateRequest(goalAsString));

		given(sideTabModifyService.updateGoal(any(AuthMember.class), anyInt(), any(GoalUpdateRequest.class)))
				.willReturn(new GoalUpdateResponse(0, goalAsString));

		givenMockLoginMember();

		/* When */
		ResultActions actions = mockMvc.perform(
				RestDocumentationRequestBuilders.patch("/side/v1/goals/{goal_id}", 0)
						.header(HttpHeaders.AUTHORIZATION, AUTHORIZATION_HEADER_VALUE)
						.contentType(MediaType.APPLICATION_JSON)
						.content(json)
		);

		/* Then */
		actions.andDo(print())
				.andDo(document("side-tab/update-goal",
						preprocessRequest(prettyPrint()),
						preprocessResponse(prettyPrint()),
						requestFields(
								fieldWithPath("content").type(JsonFieldType.STRING)
										.description("수정 요청한 목표 내용")
						),
						responseFields(
								fieldWithPath("message").type(JsonFieldType.STRING)
										.description("응답 메시지"),
								fieldWithPath("body.goal_id").type(JsonFieldType.NUMBER)
										.description("목표 식별자"),
								fieldWithPath("body.content").type(JsonFieldType.STRING)
										.description("수정한 목표 내용")
						)
				))
				.andExpect(status().isOk());
	}
}