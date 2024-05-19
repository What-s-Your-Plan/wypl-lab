package com.butter.wypl.calendar.repository;

import static com.butter.wypl.group.domain.QGroup.*;
import static com.butter.wypl.group.domain.QMemberGroup.*;
import static com.butter.wypl.label.domain.QLabel.*;
import static com.butter.wypl.member.domain.QMember.*;
import static com.butter.wypl.schedule.domain.QMemberSchedule.*;
import static com.butter.wypl.schedule.domain.QSchedule.*;

import java.util.List;

import com.butter.wypl.calendar.data.cond.FindCalendarCond;
import com.butter.wypl.calendar.data.cond.FindGroupCalendarCond;
import com.butter.wypl.schedule.domain.Schedule;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor
public class CalendarRepositoryCustomImpl implements CalendarRepositoryCustom {
	private final JPAQueryFactory query;

	@Override
	public List<Schedule> findAllByGroupCalendarCond(FindGroupCalendarCond cond) {
		return query.select(schedule)
				.from(memberSchedule)
				.join(memberSchedule.schedule, schedule)
				.join(memberSchedule.member, member)
				.join(member.memberGroups, memberGroup)
				.join(memberGroup.group, group)
				.where(member.id.eq(cond.memberId())
						.and(group.id.eq(cond.groupId()))
						.and(schedule.startDate.between(cond.startDate(), cond.lastDate()))
				).fetch();
	}

	@Override
	public List<Schedule> findAllByCalendarCond(FindCalendarCond cond) {
		return query.select(schedule)
				.from(memberSchedule)
				.join(memberSchedule.member, member)
				.join(memberSchedule.schedule, schedule)
				.leftJoin(member.memberGroups, memberGroup)
				.leftJoin(schedule.label, label)
				.where(memberSchedule.member.id.eq(cond.memberId())
						.and(eqByScheduleLabelId(cond.labelId()))
						.and(member.memberGroups.isNotEmpty())
				)
				.where(schedule.startDate.between(cond.startDate(), cond.lastDate())
						.or(schedule.endDate.between(cond.startDate(), cond.lastDate()))
						.or(schedule.startDate.loe(cond.lastDate())
								.and(schedule.endDate.goe(cond.startDate()))
						)
				)
				.orderBy(schedule.startDate.desc())
				.fetch();
	}

	private BooleanExpression eqByScheduleLabelId(final Integer labelId) {
		return labelId == null ? null : schedule.label.labelId.eq(labelId);
	}
}
