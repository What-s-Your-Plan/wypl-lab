package com.butter.wypl.schedule.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.butter.wypl.label.repository.LabelRepository;
import com.butter.wypl.schedule.data.request.ScheduleRequest;
import com.butter.wypl.schedule.data.response.ScheduleIdResponse;
import com.butter.wypl.schedule.data.response.ScheduleResponse;
import com.butter.wypl.schedule.respository.ScheduleRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ScheduleServiceImpl implements ScheduleModifyService, ScheduleReadService {

	private final ScheduleRepository scheduleRepository;
	private final LabelRepository labelRepository;

	@Override
	public ScheduleResponse createSchedule(int memberId, ScheduleRequest scheduleRequest) {
		return null;
	}

	@Override
	public ScheduleResponse updateSchedule(int memberId, int scheduleId, ScheduleRequest scheduleRequest) {
		return null;
	}

	@Override
	public ScheduleIdResponse deleteSchedule(int memberId, int scheduleId) {
		return null;
	}

	@Override
	public ScheduleResponse getScheduleByScheduleId(int scheduleId) {
		return null;
	}
}
