package com.butter.wypl.schedule.service;

import java.time.DayOfWeek;
import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.TemporalAdjusters;
import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.butter.wypl.label.repository.LabelRepository;
import com.butter.wypl.label.utils.LabelServiceUtils;
import com.butter.wypl.schedule.data.request.RepetitionRequest;
import com.butter.wypl.schedule.data.request.ScheduleRequest;
import com.butter.wypl.schedule.data.response.MemberResponse;
import com.butter.wypl.schedule.data.response.ScheduleIdResponse;
import com.butter.wypl.schedule.data.response.ScheduleResponse;
import com.butter.wypl.schedule.domain.Schedule;
import com.butter.wypl.schedule.exception.ScheduleErrorCode;
import com.butter.wypl.schedule.exception.ScheduleException;
import com.butter.wypl.schedule.respository.ScheduleRepository;
import com.butter.wypl.schedule.utils.ScheduleServiceUtils;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ScheduleServiceImpl implements ScheduleModifyService, ScheduleReadService {

	private final ScheduleRepository scheduleRepository;
	private final LabelRepository labelRepository;

	private final MemberScheduleService memberScheduleService;

	@Override
	@Transactional
	public ScheduleResponse createSchedule(int memberId, ScheduleRequest scheduleRequest) {
		Schedule schedule = scheduleRepository.save(scheduleRequest.toEntity()); //반복이 없다는 가정하에 저장

		//라벨이 있을 경우 라벨 추가
		if (scheduleRequest.labelId() != null) {
			schedule.updateLabel(LabelServiceUtils.getLabelByLabelId(labelRepository, scheduleRequest.labelId()));
		}

		//멤버-일정 테이블 업데이트
		List<MemberResponse> memberResponses = memberScheduleService.createMemberSchedule(schedule,
			scheduleRequest.members());

		//반복이 있을 경우 반복 일정 추가
		if (scheduleRequest.repetition() != null) {
			schedule.updateRepetition(scheduleRequest.repetition().toEntity());
			createRepetition(schedule, scheduleRequest.repetition());
		}

		return ScheduleResponse.from(schedule, memberResponses);
	}

	@Override
	@Transactional
	public ScheduleResponse updateSchedule(int memberId, int scheduleId, ScheduleRequest scheduleRequest) {
		Schedule schedule = ScheduleServiceUtils.findById(scheduleRepository, scheduleId);

		//TODO : schedule에 속한 멤버인지 확인해야 됨

		return null;
	}

	@Override
	@Transactional
	public ScheduleIdResponse deleteSchedule(int memberId, int scheduleId) {
		return null;
	}

	@Override
	@Transactional
	public ScheduleIdResponse deleteRepeatSchedule(int memberId, int scheduleId) {
		return null;
	}

	@Override
	public ScheduleResponse getScheduleByScheduleId(int scheduleId) {
		return null;
	}

	private void createRepetition(Schedule originSchedule, RepetitionRequest repetition) {
		LocalDate repetitionStartDate = repetition.repetitionStartDate();
		LocalDate repetitionEndDate =
			repetition.repetitionEndDate() == null ? repetitionStartDate.plusYears(3) : repetition.repetitionEndDate();

		LocalDateTime startDateTime, endDateTime;
		startDateTime = originSchedule.getStartDate();
		endDateTime = originSchedule.getEndDate();

		List<Schedule> addSchedules = new ArrayList<>();

		switch (repetition.repetitionCycle()) {
			case YEAR -> {
				startDateTime = startDateTime.plusYears(1);
				endDateTime = endDateTime.plusYears(1);

				while (startDateTime.toLocalDate().isEqual(repetitionEndDate) || startDateTime.toLocalDate()
					.isBefore(repetitionEndDate)) {

					addSchedules.add(originSchedule.toRepetitionSchedule(startDateTime, endDateTime));

					startDateTime = startDateTime.plusYears(1);
					endDateTime = endDateTime.plusYears(1);
				}
			}
			case MONTH -> {
				startDateTime = startDateTime.plusMonths(1);
				endDateTime = endDateTime.plusMonths(1);

				while (startDateTime.toLocalDate().isEqual(repetitionEndDate) || startDateTime.toLocalDate()
					.isBefore(repetitionEndDate)) {
					addSchedules.add(originSchedule.toRepetitionSchedule(startDateTime, endDateTime));

					startDateTime = startDateTime.plusMonths(1);
					endDateTime = endDateTime.plusMonths(1);
				}
			}
			case WEEK -> {
				Duration diffDateTime = Duration.between(startDateTime, endDateTime);

				byte repetitionWeek = originSchedule.getRepetition().getDayOfWeek();
				DayOfWeek dayOfWeek;

				for (int i = 0; i < 7; i++) {
					if ((repetitionWeek & (1 << i)) > 0) {
						dayOfWeek = switch (i) {
							case 6 -> DayOfWeek.SUNDAY;
							case 5 -> DayOfWeek.MONDAY;
							case 4 -> DayOfWeek.TUESDAY;
							case 3 -> DayOfWeek.WEDNESDAY;
							case 2 -> DayOfWeek.THURSDAY;
							case 1 -> DayOfWeek.FRIDAY;
							case 0 -> DayOfWeek.SATURDAY;
							default -> throw new ScheduleException(ScheduleErrorCode.NOT_APPROPRIATE_REPETITION_CYCLE);
						};

						startDateTime = originSchedule.getStartDate().with(TemporalAdjusters.next(dayOfWeek));
						endDateTime = startDateTime.plus(diffDateTime);

						while (startDateTime.toLocalDate().isEqual(repetitionEndDate) || startDateTime.toLocalDate()
							.isBefore(repetitionEndDate)) {
							addSchedules.add(originSchedule.toRepetitionSchedule(startDateTime, endDateTime));

							startDateTime = startDateTime.plusWeeks(1);
							endDateTime = endDateTime.plusWeeks(1);
						}
					}
				}
			}
			default -> throw new ScheduleException(ScheduleErrorCode.NOT_APPROPRIATE_REPETITION_CYCLE);
		}

		scheduleRepository.saveAll(addSchedules);
	}

}
