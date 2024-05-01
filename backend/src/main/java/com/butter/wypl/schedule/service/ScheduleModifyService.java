package com.butter.wypl.schedule.service;

import java.util.List;

import com.butter.wypl.schedule.data.ModificationType;
import com.butter.wypl.schedule.data.request.ScheduleCreateRequest;
import com.butter.wypl.schedule.data.request.ScheduleUpdateRequest;
import com.butter.wypl.schedule.data.response.ScheduleIdResponse;
import com.butter.wypl.schedule.data.response.ScheduleResponse;

public interface ScheduleModifyService {

	ScheduleResponse createSchedule(int memberId, ScheduleCreateRequest scheduleCreateRequest);

	ScheduleResponse updateSchedule(int memberId, int scheduleId, ScheduleUpdateRequest scheduleUpdateRequest);

	List<ScheduleIdResponse> deleteSchedule(int memberId, int scheduleId, ModificationType modificationType);

}
