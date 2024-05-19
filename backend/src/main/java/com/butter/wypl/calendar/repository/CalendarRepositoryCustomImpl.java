package com.butter.wypl.calendar.repository;

import static com.butter.wypl.group.domain.QGroup.*;
import static com.butter.wypl.group.domain.QMemberGroup.*;
import static com.butter.wypl.member.domain.QMember.*;
import static com.butter.wypl.schedule.domain.QMemberSchedule.*;
import static com.butter.wypl.schedule.domain.QSchedule.*;

import java.util.List;

import com.butter.wypl.calendar.data.cond.FindGroupCalendarCond;
import com.butter.wypl.schedule.domain.Schedule;
import com.querydsl.jpa.impl.JPAQueryFactory;

import lombok.RequiredArgsConstructor;

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
}
