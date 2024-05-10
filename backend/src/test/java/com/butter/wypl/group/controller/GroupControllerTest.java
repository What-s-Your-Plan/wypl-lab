package com.butter.wypl.group.controller;

import static com.butter.wypl.group.fixture.GroupFixture.*;
import static com.butter.wypl.member.fixture.MemberFixture.*;
import static com.epages.restdocs.apispec.MockMvcRestDocumentationWrapper.*;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.BDDMockito.*;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.Arrays;
import java.util.Collections;
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
import com.butter.wypl.group.data.request.GroupUpdateRequest;
import com.butter.wypl.group.data.response.GroupDetailResponse;
import com.butter.wypl.group.data.response.GroupIdResponse;
import com.butter.wypl.group.data.response.GroupListByMemberIdResponse;
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
	@DisplayName("그룹을 생성")
	void createGroupTest() throws Exception {

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
			.andDo(document("group/create-group",
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

	@Test
	@DisplayName("그룹 상세 정보를 조회")
	void getDetailByIdTest() throws Exception {

		/* Given */
		int groupId = 1;

		given(groupLoadService.getDetailById(anyInt(), anyInt()))
			.willReturn(GroupDetailResponse.of(GROUP_STUDY.toGroup(HAN_JI_WON.toMember()),
				Collections.singletonList(HAN_JI_WON.toMember())));

		givenMockLoginMember();

		/* When */
		ResultActions actions = mockMvc.perform(
			RestDocumentationRequestBuilders.get("/group/v1/groups/{groupId}", groupId)
				.header(HttpHeaders.AUTHORIZATION, AUTHORIZATION_HEADER_VALUE)
				.contentType(MediaType.APPLICATION_JSON)

		);

		/* Then */
		actions.andDo(print())
			.andDo(document("group/get-detail-group",
				preprocessRequest(prettyPrint()),
				preprocessResponse(prettyPrint()),
				pathParameters(
					parameterWithName("groupId").description("그룹 식별자")
				),
				responseFields(
					fieldWithPath("message").type(JsonFieldType.STRING)
						.description("응답 메시지"),
					fieldWithPath("body.group_id").type(JsonFieldType.NUMBER)
						.description("그룹 식별자"),
					fieldWithPath("body.name").type(JsonFieldType.STRING)
						.description("그룹 이름"),
					fieldWithPath("body.description").type(JsonFieldType.STRING)
						.description("그룹 설명"),
					fieldWithPath("body.owner").type(JsonFieldType.OBJECT)
						.description("그룹 소유자 정보"),
					fieldWithPath("body.owner.member_id").type(JsonFieldType.NUMBER)
						.description("그룹 소유자 식별자"),
					fieldWithPath("body.owner.email").type(JsonFieldType.STRING)
						.description("그룹 소유자 이메일"),
					fieldWithPath("body.owner.nickname").type(JsonFieldType.STRING)
						.description("그룹 소유자 닉네임"),
					fieldWithPath("body.owner.profile_image").type(JsonFieldType.STRING).optional()
						.description("그룹 소유자 프로필 이미지"),
					fieldWithPath("body.member_count").type(JsonFieldType.NUMBER)
						.description("그룹 멤버 수"),
					fieldWithPath("body.members").type(JsonFieldType.ARRAY)
						.description("그룹 멤버 리스트"),
					fieldWithPath("body.members[].member_id").type(JsonFieldType.NUMBER)
						.description("그룹 멤버 식별자"),
					fieldWithPath("body.members[].email").type(JsonFieldType.STRING)
						.description("그룹 멤버 이메일"),
					fieldWithPath("body.members[].nickname").type(JsonFieldType.STRING)
						.description("그룹 멤버 닉네임"),
					fieldWithPath("body.members[].profile_image").type(JsonFieldType.STRING).optional()
						.description("그룹 멤버 프로필 이미지")
				)
			))
			.andExpect(status().isOk());
	}

	@Test
	@DisplayName("그룹 수정")
	void updateGroupTest() throws Exception {

		/* Given */
		GroupUpdateRequest updateRequest = new GroupUpdateRequest("업데이트 할 그룹명", "다시 시작 해 보자구 ~");

		givenMockLoginMember();

		/* When */
		ResultActions actions = mockMvc.perform(
			RestDocumentationRequestBuilders.patch("/group/v1/groups/{groupId}", 1)
				.header(HttpHeaders.AUTHORIZATION, AUTHORIZATION_HEADER_VALUE)
				.contentType(MediaType.APPLICATION_JSON)
				.content(convertToJson(updateRequest))
		);

		/* Then */
		actions.andDo(print())
			.andDo(document("group/update-group",
				preprocessRequest(prettyPrint()),
				preprocessResponse(prettyPrint()),
				pathParameters(
					parameterWithName("groupId").description("그룹 식별자")
				),
				requestFields(
					fieldWithPath("name").type(JsonFieldType.STRING)
						.description("수정할 그룹 이름"),
					fieldWithPath("description").type(JsonFieldType.STRING)
						.description("수정할 그룹 설명")
				),
				responseFields(
					fieldWithPath("message").type(JsonFieldType.STRING)
						.description("응답 메시지")
				)
			))
			.andExpect(status().isOk());
	}

	@Test
	@DisplayName("그룹 삭제")
	void deleteGroupTest() throws Exception {

		/* Given */
		givenMockLoginMember();

		/* When */
		ResultActions actions = mockMvc.perform(
			RestDocumentationRequestBuilders.delete("/group/v1/groups/{groupId}", 1)
				.header(HttpHeaders.AUTHORIZATION, AUTHORIZATION_HEADER_VALUE)
				.contentType(MediaType.APPLICATION_JSON)
		);

		/* Then */
		actions.andDo(print())
			.andDo(document("group/delete-group",
				preprocessRequest(prettyPrint()),
				preprocessResponse(prettyPrint()),
				pathParameters(
					parameterWithName("groupId").description("그룹 식별자")
				),
				responseFields(
					fieldWithPath("message").type(JsonFieldType.STRING)
						.description("응답 메시지")
				)
			))
			.andExpect(status().isOk());
	}

	@Test
	@DisplayName("회원의 모든 그룹 목록을 조회")
	void getGroupListByMemberIdTest() throws Exception {

		/* Given */
		int memberId = 1;

		given(groupLoadService.getGroupListByMemberId(anyInt()))
			.willReturn(GroupListByMemberIdResponse.from(HAN_JI_WON.toMember()));

		givenMockLoginMember();

		/* When */
		ResultActions actions = mockMvc.perform(
			RestDocumentationRequestBuilders.get("/group/v1/groups/members/{memberId}", memberId)
				.header(HttpHeaders.AUTHORIZATION, AUTHORIZATION_HEADER_VALUE)
				.contentType(MediaType.APPLICATION_JSON)

		);

		/* Then */
		actions.andDo(print())
			.andDo(document("group/get-groups-by-member-id",
				preprocessRequest(prettyPrint()),
				preprocessResponse(prettyPrint()),
				pathParameters(
					parameterWithName("memberId").description("회원 식별자")
				),
				responseFields(
					fieldWithPath("message").type(JsonFieldType.STRING)
						.description("응답 메시지"),
					fieldWithPath("body.member_id").type(JsonFieldType.NUMBER)
						.description("회원 식별자"),
					fieldWithPath("body.nickname").type(JsonFieldType.STRING)
						.description("회원 닉네임"),
					fieldWithPath("body.email").type(JsonFieldType.STRING)
						.description("회원 이메일"),
					fieldWithPath("body.group_count").type(JsonFieldType.NUMBER)
						.description("그룹 수"),
					fieldWithPath("body.groups[]").type(JsonFieldType.ARRAY)
						.description("그룹 목록"),
					fieldWithPath("body.groups[].group_id").type(JsonFieldType.NUMBER).optional()
						.description("그룹 식별자"),
					fieldWithPath("body.groups[].name").type(JsonFieldType.STRING).optional()
						.description("그룹 이름"),
					fieldWithPath("body.groups[].description").type(JsonFieldType.STRING).optional()
						.description("그룹 설명"),
					fieldWithPath("body.groups[].owner").type(JsonFieldType.OBJECT).optional()
						.description("그룹 소유자 정보"),
					fieldWithPath("body.groups[].owner.member_id").type(JsonFieldType.NUMBER).optional()
						.description("그룹 소유자 식별자"),
					fieldWithPath("body.groups[].owner.email").type(JsonFieldType.STRING).optional()
						.description("그룹 소유자 이메일"),
					fieldWithPath("body.groups[].owner.profile_image").type(JsonFieldType.STRING).optional()
						.description("그룹 소유자 프로필 이미지"),
					fieldWithPath("body.groups[].member_count").type(JsonFieldType.NUMBER).optional()
						.description("그룹 멤버 수"),
					fieldWithPath("body.groups[].members[]").type(JsonFieldType.ARRAY).optional()
						.description("그룹 멤버 리스트"),
					fieldWithPath("body.groups[].members[].member_id").type(JsonFieldType.NUMBER).optional()
						.description("그룹 멤버 식별자"),
					fieldWithPath("body.groups[].members[].email").type(JsonFieldType.STRING).optional()
						.description("그룹 멤버 이메일"),
					fieldWithPath("body.groups[].members[].nickname").type(JsonFieldType.STRING).optional()
						.description("그룹 멤버 닉네임"),
					fieldWithPath("body.groups[].members[].profile_image").type(JsonFieldType.STRING).optional()
						.description("그룹 멤버 프로필 이미지")
				)
			))
			.andExpect(status().isOk());

	}
}