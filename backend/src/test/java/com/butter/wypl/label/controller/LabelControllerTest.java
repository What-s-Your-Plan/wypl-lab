package com.butter.wypl.label.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.test.web.servlet.MockMvc;

@WebMvcTest(LabelControllerTest.class)
public class LabelControllerTest {
	@Autowired
	MockMvc mockMvc;

}
