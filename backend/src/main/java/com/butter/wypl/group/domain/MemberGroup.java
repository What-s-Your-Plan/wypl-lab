package com.butter.wypl.group.domain;

import com.butter.wypl.global.common.BaseEntity;
import com.butter.wypl.member.domain.Member;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
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

	@Column(name = "color", columnDefinition = "varchar(6) default 'fb392c'")
	private String color; // 기본 값: 오렌지 색

	@Builder
	protected MemberGroup(Member member, Group group, String color) {
		this.member = member;
		this.group = group;
		this.color = color;
	}

	public static MemberGroup of(Member member, Group group, String color) {
		return MemberGroup.builder()
			.member(member)
			.group(group)
			.color(color)
			.build();
	}

	public static MemberGroup of(Member member, Group group) {
		return MemberGroup.builder()
			.member(member)
			.group(group)
			.build();
	}
}
