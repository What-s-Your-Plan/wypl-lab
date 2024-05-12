package com.butter.wypl.member.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.butter.wypl.member.domain.Member;
import com.butter.wypl.member.repository.query.MemberRepositoryCustom;

public interface MemberRepository extends JpaRepository<Member, Integer>,
		MemberRepositoryCustom {
	Optional<Member> findByEmail(String email);
}
