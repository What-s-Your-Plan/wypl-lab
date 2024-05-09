package com.butter.wypl.group.service;

import org.mockito.InjectMocks;
import org.mockito.Mock;

import com.butter.wypl.global.annotation.ServiceTest;
import com.butter.wypl.group.repository.MemberGroupRepository;

@ServiceTest
class MemberGroupServiceTest {

	@InjectMocks
	private MemberGroupService memberGroupService;

	@Mock
	private MemberGroupRepository memberGroupRepository;

}