package com.butter.wypl.group.domain;

import com.butter.wypl.global.common.BaseEntity;
import com.butter.wypl.global.common.Color;
import com.butter.wypl.member.domain.Member;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@IdClass(MemberGroupId.class)
public class MemberGroup extends BaseEntity {

	@Id
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_id")
	private Member member;

	@Id
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "group_id")
	private Group group;

	@Enumerated(EnumType.STRING)
	@Column(name = "color", length = 20, nullable = false)
	private Color color;

	@Enumerated(EnumType.STRING)
	@Column(name = "state", length = 20, nullable = false)
	private GroupInviteState groupInviteState;

	@Builder
	private MemberGroup(Member member, Group group, Color color) {
		this.member = member;
		this.group = group;
		this.color = color;
		this.groupInviteState = GroupInviteState.PENDING;
	}

	public static MemberGroup of(Member member, Group group, Color color) {
		return MemberGroup.builder()
			.member(member)
			.group(group)
			.color(color)
			.build();
	}
}
