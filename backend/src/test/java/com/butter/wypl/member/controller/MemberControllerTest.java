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
import org.springframework.core.MethodParameter;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.ModelAndViewContainer;

import com.butter.wypl.auth.domain.AuthMember;
import com.butter.wypl.auth.utils.AuthenticatedArgumentResolver;
import com.butter.wypl.auth.utils.JwtProvider;
import com.butter.wypl.global.annotation.MockControllerTest;
import com.butter.wypl.member.data.request.MemberNicknameUpdateRequest;
import com.butter.wypl.member.data.response.MemberNicknameUpdateResponse;
import com.butter.wypl.member.service.MemberLoadService;
import com.butter.wypl.member.service.MemberModifyService;
import com.fasterxml.jackson.databind.ObjectMapper;

@MockControllerTest
class MemberControllerTest {
	private static final String AUTHORIZATION_HEADER_VALUE = "Bearer header.payload.signature";

	@Autowired
	private MockMvc mockMvc;
	@Autowired
	private ObjectMapper objectMapper;
	@Autowired
	private MemberController memberController;

	@MockBean
	private MemberModifyService memberModifyService;
	@MockBean
	private MemberLoadService memberLoadService;
	@MockBean
	private AuthenticatedArgumentResolver authenticatedArgumentResolver;
	@MockBean
	private JwtProvider jwtProvider;

	@DisplayName("사용자가 닉네임을 수정한다.")
	@Test
	void updateNicknameTest() throws Exception {
		/* Given */
		String nickname = "wypl";
		MemberNicknameUpdateRequest request = new MemberNicknameUpdateRequest(nickname);
		String json = objectMapper.writeValueAsString(request);

		given(memberModifyService.modifyNickname(any(AuthMember.class), any(MemberNicknameUpdateRequest.class)))
				.willReturn(new MemberNicknameUpdateResponse(nickname));
		given(authenticatedArgumentResolver.supportsParameter(any(MethodParameter.class)))
				.willReturn(true);
		given(authenticatedArgumentResolver.resolveArgument(
				any(MethodParameter.class),
				any(ModelAndViewContainer.class),
				any(NativeWebRequest.class),
				any(WebDataBinderFactory.class))
		).willReturn(any(AuthMember.class));

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