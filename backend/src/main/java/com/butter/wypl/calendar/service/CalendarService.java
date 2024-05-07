package com.butter.wypl.calendar.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.butter.wypl.label.repository.LabelRepository;
import com.butter.wypl.schedule.respository.MemberScheduleRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CalendarService {

	private MemberScheduleRepository memberScheduleRepository;
	private LabelRepository labelRepository;

	// public CalendarResponse getCalendarSchedules(CalendarType calendarType, Integer labelId, LocalDate standardDate) {
	//
	// }
}
