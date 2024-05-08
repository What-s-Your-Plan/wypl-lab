package com.butter.wypl.group.domain;

import com.butter.wypl.global.common.BaseEntity;
import com.butter.wypl.global.common.Color;
import com.butter.wypl.member.domain.Member;

import jakarta.persistence.Embedded;
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

	@Embedded
	private Color color;

	@Builder
	private MemberGroup(Member member, Group group, Color color) {
		this.member = member;
		this.group = group;
		this.color = color;
	}

	public static MemberGroup of(Member member, Group group, Color color) {
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
