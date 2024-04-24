package com.butter.wypl.auth.utils;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.extension.ExtendWith;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.mockito.InjectMocks;
import org.mockito.junit.jupiter.MockitoExtension;

import com.butter.wypl.auth.data.JsonWebTokens;

@ExtendWith(MockitoExtension.class)
class JwtProviderTest {

	@InjectMocks
	private JwtProvider jwtProvider;

	@DisplayName("JWT 토큰 발급에 성공한다.")
	@ParameterizedTest
	@ValueSource(ints = {1, Integer.MAX_VALUE})
	void generateTokens(int memberId) {
		/* Given */

		/* When */
		JsonWebTokens tokens = jwtProvider.generateJsonWebTokens(memberId);

		/* Then */
		assertAll(
				() -> assertThat(tokens.accessToken()).isNotNull(),
				() -> assertThat(tokens.refreshToken()).isNotNull()
		);
	}
}