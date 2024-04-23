package com.butter.wypl.global.member.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.butter.wypl.global.member.domain.Member;

public interface MemberRepository extends JpaRepository<Member, Integer> {
}
