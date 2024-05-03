package com.butter.wypl.group.domain;

import com.butter.wypl.global.common.BaseEntity;
import com.butter.wypl.member.domain.Member;
import jakarta.persistence.*;

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

    @Column(name = "color", nullable = false, length = 6)
    private String coler;

}
