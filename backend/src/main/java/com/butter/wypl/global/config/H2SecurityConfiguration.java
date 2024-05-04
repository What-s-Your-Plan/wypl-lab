package com.butter.wypl.global.config;

import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

import lombok.RequiredArgsConstructor;

@Profile({"local", "default"})
@RequiredArgsConstructor
@Configuration
public class H2SecurityConfiguration {

	@Bean
	public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
		http
				.csrf(httpSecurityCsrfConfigurer ->
						httpSecurityCsrfConfigurer.ignoringRequestMatchers(PathRequest.toH2Console())
								.disable())
				.authorizeHttpRequests(authorizationManagerRequestMatcherRegistry ->
						authorizationManagerRequestMatcherRegistry
								.requestMatchers(PathRequest.toH2Console()).permitAll());
		return http.build();
	}
}
