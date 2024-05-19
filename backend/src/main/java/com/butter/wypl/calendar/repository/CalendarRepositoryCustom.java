package com.butter.wypl.calendar.repository;

import java.util.List;

import com.butter.wypl.calendar.data.cond.FindGroupCalendarCond;
import com.butter.wypl.schedule.domain.Schedule;

public interface CalendarRepositoryCustom {
	List<Schedule> findAllByGroupCalendarCond(FindGroupCalendarCond cond);
}
