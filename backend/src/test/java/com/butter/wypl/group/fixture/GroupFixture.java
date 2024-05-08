package com.butter.wypl.group.fixture;

import com.butter.wypl.group.domain.Group;
import com.butter.wypl.member.domain.Member;

import lombok.Getter;

@Getter
public enum GroupFixture {

	GROUP_STUDY("study group", "신나는 스터디 모임");

	private final String name;
	private final String description;
	private Member owner;

	GroupFixture(String name, String description) {
		this.name = name;
		this.description = description;
	}

	public Group toGroup(Member member) {
		return Group.of(name, description, member);
	}
}
