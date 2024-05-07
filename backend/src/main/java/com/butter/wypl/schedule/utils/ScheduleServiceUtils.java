package com.butter.wypl.schedule.utils;

import java.time.LocalDateTime;
import java.util.List;

import com.butter.wypl.schedule.domain.Schedule;
import com.butter.wypl.schedule.exception.ScheduleErrorCode;
import com.butter.wypl.schedule.exception.ScheduleException;
import com.butter.wypl.schedule.respository.ScheduleRepository;

public class ScheduleServiceUtils {

	public static Schedule findById(
		final ScheduleRepository scheduleRepository,
		final int id
	) {
		return scheduleRepository.findById(id)
			.orElseThrow(() -> new ScheduleException(ScheduleErrorCode.NO_SCHEDULE));
	}

	public static List<Schedule> findSchedulesBetween(
		final ScheduleRepository scheduleRepository,
		final LocalDateTime firstDate,
		final LocalDateTime endDate
	) {
		return scheduleRepository.findAllByStartDateBetween(firstDate, endDate);
	}
}
