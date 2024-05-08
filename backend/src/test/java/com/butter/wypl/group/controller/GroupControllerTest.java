package com.butter.wypl.group.controller;

import static org.mockito.ArgumentMatchers.*;
import static org.mockito.BDDMockito.*;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.*;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.Arrays;
import java.util.HashSet;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.ResultActions;

import com.butter.wypl.global.common.ControllerTest;
import com.butter.wypl.group.data.request.GroupCreateRequest;
import com.butter.wypl.group.data.response.GroupIdResponse;
import com.butter.wypl.group.repository.GroupRepository;
import com.butter.wypl.group.repository.MemberGroupRepository;
import com.butter.wypl.group.service.GroupLoadService;
import com.butter.wypl.group.service.GroupModifyService;
import com.butter.wypl.member.repository.MemberRepository;

class GroupControllerTest extends ControllerTest {

	@Autowired
	private GroupController groupController;

	@MockBean
	private GroupModifyService groupModifyService;

	@MockBean
	private GroupLoadService groupLoadService;

	@MockBean
	private GroupRepository groupRepository;

	@MockBean
	private MemberRepository memberRepository;

	@MockBean
	private MemberGroupRepository memberGroupRepository;

	@Test
	@DisplayName("그룹을 생성한다.")
	void createGroup() throws Exception {

		/* Given */
		GroupCreateRequest createRequest = new GroupCreateRequest("group1", "group1 description",
			new HashSet<>(Arrays.asList(2, 3)));

		GroupIdResponse createResponse = new GroupIdResponse(1);
		given(groupModifyService.createGroup(anyInt(), any(GroupCreateRequest.class)))
			.willReturn(createResponse);

		givenMockLoginMember();

		/* When */
		ResultActions actions = mockMvc.perform(
			RestDocumentationRequestBuilders.post("/group/v1/groups")
				.header(HttpHeaders.AUTHORIZATION, AUTHORIZATION_HEADER_VALUE)
				.contentType(MediaType.APPLICATION_JSON)
				.content(convertToJson(createRequest))
		);

		/* Then */
		actions.andDo(print())
			.andDo(document("/group/v1/groups",
				preprocessRequest(prettyPrint()),
				preprocessResponse(prettyPrint()),
				requestFields(
					fieldWithPath("name").type(JsonFieldType.STRING)
						.description("그룹 이름"),
					fieldWithPath("description").type(JsonFieldType.STRING)
						.description("그룹 설명"),
					fieldWithPath("member_id_list[]").type(JsonFieldType.ARRAY)
						.description("그룹 멤버 식별자 리스트")
				),
				responseFields(
					fieldWithPath("message").type(JsonFieldType.STRING)
						.description("응답 메시지"),
					fieldWithPath("body.group_id").type(JsonFieldType.NUMBER)
						.description("그룹 식별자")
				)
			))
			.andExpect(status().isCreated());
	}
}