package com.butter.wypl.group.domain;

import com.butter.wypl.global.common.BaseEntity;
import com.butter.wypl.member.domain.Member;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity
@IdClass(MemberGroupId.class)
public class MemberGroup extends BaseEntity {

	@Id
	@ManyToOne
	@JoinColumn(name = "member_id")
	private Member member;

	@Id
	@ManyToOne
	@JoinColumn(name = "group_id")
	private Group group;

	@Column(name = "color", length = 6, columnDefinition = "default 'fb392c'")
	private String color; // 기본 값: 오렌지 색
}
