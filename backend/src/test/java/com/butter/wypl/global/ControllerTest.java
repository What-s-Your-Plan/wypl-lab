package com.butter.wypl.global;

import org.apache.catalina.security.SecurityConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.web.WebAppConfiguration;
import org.springframework.test.web.servlet.MockMvc;

@ActiveProfiles({"test"})
@AutoConfigureRestDocs
@ContextConfiguration(classes = SecurityConfig.class)
@WebAppConfiguration
@WebMvcTest
public class ControllerTest {
	@Autowired
	protected MockMvc mockMvc;
}
