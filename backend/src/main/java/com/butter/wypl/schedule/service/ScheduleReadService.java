package com.butter.wypl.schedule.service;

import com.butter.wypl.schedule.data.response.ScheduleResponse;

public interface ScheduleReadService {

	ScheduleResponse getScheduleByScheduleId(int scheduleId);

}
