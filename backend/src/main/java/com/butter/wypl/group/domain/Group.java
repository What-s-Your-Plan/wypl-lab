package com.butter.wypl.group.domain;

import com.butter.wypl.global.common.BaseEntity;
import com.butter.wypl.member.domain.Member;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "groups")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Group extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "group_id")
    private int id;

    @Column(name = "name", length = 20, nullable = false)
    private String name;

    @Column(name = "description", length = 50)
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "owner_id")
    private Member ownerId;

    @Builder
    public Group(String name, String description, Member ownerId) {
        this.name = name;
        this.description = description;
        this.ownerId = ownerId;
    }
}
