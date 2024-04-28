package com.butter.wypl.auth.service;

import org.springframework.transaction.annotation.Transactional;

import com.butter.wypl.global.annotation.FacadeService;
import com.butter.wypl.member.repository.MemberRepository;
import com.butter.wypl.member.repository.SideTabRepository;
import com.butter.wypl.member.repository.SocialMemberRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Transactional
@FacadeService
public class SignInService {
	private final MemberRepository memberRepository;
	private final SideTabRepository sideTabRepository;
	private final SocialMemberRepository socialMemberRepository;

}
