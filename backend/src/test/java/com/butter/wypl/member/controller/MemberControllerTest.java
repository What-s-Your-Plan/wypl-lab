package com.butter.wypl.member.controller;

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
import com.butter.wypl.member.data.request.MemberNicknameUpdateRequest;
import com.butter.wypl.member.data.response.MemberNicknameUpdateResponse;
import com.butter.wypl.member.service.MemberLoadService;
import com.butter.wypl.member.service.MemberModifyService;

class MemberControllerTest extends ControllerTest {

	@Autowired
	private MemberController memberController;

	@MockBean
	private MemberModifyService memberModifyService;
	@MockBean
	private MemberLoadService memberLoadService;

	@DisplayName("사용자가 닉네임을 수정한다.")
	@Test
	void updateNicknameTest() throws Exception {
		/* Given */
		String nickname = "wypl";
		String json = convertToJson(new MemberNicknameUpdateRequest(nickname));

		given(memberModifyService.modifyNickname(any(AuthMember.class), any(MemberNicknameUpdateRequest.class)))
				.willReturn(new MemberNicknameUpdateResponse(nickname));

		givenMockLoginMember();

		/* When */
		ResultActions actions = mockMvc.perform(
				RestDocumentationRequestBuilders.patch("/member/v1/members/nickname")
						.header(HttpHeaders.AUTHORIZATION, AUTHORIZATION_HEADER_VALUE)
						.contentType(MediaType.APPLICATION_JSON)
						.content(json)
		);

		/* Then */
		actions.andDo(print())
				.andDo(document("member/update-nickname",
						preprocessRequest(prettyPrint()),
						preprocessResponse(prettyPrint()),
						requestFields(
								fieldWithPath("nickname").type(JsonFieldType.STRING)
										.description("변경 요청한 닉네임")
						),
						responseFields(
								fieldWithPath("message").type(JsonFieldType.STRING)
										.description("응답 메시지"),
								fieldWithPath("body.nickname").type(JsonFieldType.STRING)
										.description("변경한 닉네임")
						)
				))
				.andExpect(status().isOk());
	}
}