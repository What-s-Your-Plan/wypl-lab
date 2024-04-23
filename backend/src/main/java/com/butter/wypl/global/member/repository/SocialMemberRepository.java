package com.butter.wypl.global.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.butter.wypl.global.member.domain.SocialMember;

public interface SocialMemberRepository extends JpaRepository<SocialMember, Integer> {
}
