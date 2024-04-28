package com.butter.wypl.auth.controller;

import static org.mockito.BDDMockito.*;
import static org.springframework.restdocs.headers.HeaderDocumentation.*;
import static org.springframework.restdocs.mockmvc.MockMvcRestDocumentation.*;
import static org.springframework.restdocs.operation.preprocess.Preprocessors.*;
import static org.springframework.restdocs.payload.PayloadDocumentation.*;
import static org.springframework.restdocs.request.RequestDocumentation.*;
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
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;

import com.butter.wypl.auth.annotation.AuthenticatedArgumentResolver;
import com.butter.wypl.auth.data.response.AuthTokensResponse;
import com.butter.wypl.auth.domain.AuthMember;
import com.butter.wypl.auth.service.AuthService;
import com.butter.wypl.auth.utils.JwtProvider;
import com.butter.wypl.global.annotation.MockControllerTest;

@MockControllerTest
class AuthControllerTest {
	private static final String AUTHORIZATION_HEADER_VALUE = "Bearer header.payload.signature";

	@Autowired
	private MockMvc mockMvc;
	@Autowired
	private AuthController authController;

	@MockBean
	private AuthService authService;
	@MockBean
	private AuthenticatedArgumentResolver authenticatedArgumentResolver;
	@MockBean
	private JwtProvider jwtProvider;

	@DisplayName("회원 가입 및 로그인한다.")
	@Test
	void signInTest() throws Exception {
		/* Given */
		AuthTokensResponse response = new AuthTokensResponse(0, "at", "rt");
		given(authenticatedArgumentResolver.supportsParameter(any()))
				.willReturn(true);
		given(authenticatedArgumentResolver.resolveArgument(any(), any(), any(), any()))
				.willReturn(AuthMember.from(0));
		given(authService.generateTokens(any(String.class), any(String.class)))
				.willReturn(response);

		/* When */
		ResultActions actions = mockMvc.perform(
				RestDocumentationRequestBuilders.post(
								"/auth/v1/sign-in/{provider}?code={code}",
								"google",
								"dummy_code"
						)
						.header(HttpHeaders.AUTHORIZATION, AUTHORIZATION_HEADER_VALUE)
						.contentType(MediaType.APPLICATION_JSON)
		);

		/* Then */
		actions.andDo(print())
				.andDo(document("auth/sign-in",
						preprocessRequest(prettyPrint()),
						preprocessResponse(prettyPrint()),
						requestHeaders(
								headerWithName(HttpHeaders.AUTHORIZATION).description("JWT Access Token")
						),
						pathParameters(
								parameterWithName("provider").description("소셜 로그인 제공자")
						),
						queryParameters(
								parameterWithName("code").description("인증 코드")
						),
						responseFields(
								fieldWithPath("message").type(JsonFieldType.STRING)
										.description("응답 메시지"),
								fieldWithPath("body.member_id").type(JsonFieldType.NUMBER)
										.description("회원 식별자"),
								fieldWithPath("body.access_token").type(JsonFieldType.STRING)
										.description("JWT Access Token"),
								fieldWithPath("body.refresh_token").type(JsonFieldType.STRING)
										.description("JWT Refresh Token")
						)
				))
				.andExpect(status().isCreated());
	}
}