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

import com.butter.wypl.label.domain.Label;
import com.butter.wypl.label.repository.LabelRepository;
import com.butter.wypl.label.utils.LabelServiceUtils;
import com.butter.wypl.member.domain.Member;
import com.butter.wypl.schedule.data.ModificationType;
import com.butter.wypl.schedule.data.request.ScheduleCreateRequest;
import com.butter.wypl.schedule.data.request.ScheduleUpdateRequest;
import com.butter.wypl.schedule.data.response.ScheduleIdListResponse;
import com.butter.wypl.schedule.data.response.ScheduleIdResponse;
import com.butter.wypl.schedule.data.response.ScheduleResponse;
import com.butter.wypl.schedule.domain.Repetition;
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
	private final RepetitionService repetitionService;

	@Override
	@Transactional
	public ScheduleResponse createSchedule(int memberId, ScheduleCreateRequest scheduleCreateRequest) {
		Label label = scheduleCreateRequest.labelId() == null ? null
			: LabelServiceUtils.getLabelByLabelId(labelRepository, scheduleCreateRequest.labelId()); //라벨 유효성 검사

		Schedule schedule = scheduleRepository.save(scheduleCreateRequest.toEntity(label)); //반복이 없다는 가정하에 저장

		//TODO : 그룹 아이디 받았을 때 그룹에 포함된 사람인지 확인 해야 됨
		//멤버-일정 테이블 업데이트
		List<Member> memberResponses = memberScheduleService.createMemberSchedule(schedule,
			scheduleCreateRequest.members());

		//반복이 있을 경우 반복 일정 추가
		if (scheduleCreateRequest.repetition() != null) {
			Repetition repetition = repetitionService.createRepetition(scheduleCreateRequest.repetition().toEntity());

			schedule.updateRepetition(repetition);
			createRepetitionSchedules(schedule, repetition);
		}

		return ScheduleResponse.of(schedule, memberResponses);
	}

	@Override
	@Transactional
	public ScheduleResponse updateSchedule(int memberId, int scheduleId, ScheduleUpdateRequest scheduleUpdateRequest) {
		Schedule schedule = ScheduleServiceUtils.findById(scheduleRepository, scheduleId);

		//스케줄에 속한 멤버인지 확인(권한 확인)
		memberScheduleService.validateMemberSchedule(schedule, memberId);

		//라벨 update & 라벨 유효성 검사
		if (scheduleUpdateRequest.labelId() != null) {
			schedule.updateLabel(LabelServiceUtils.getLabelByLabelId(labelRepository, scheduleUpdateRequest.labelId()));
		} else {
			schedule.updateLabel(null);
		}

		//라벨, 속한 멤버, 반복 외의 일정 update
		schedule.update(scheduleUpdateRequest);

		//멤버-일정 update
		List<Member> members = memberScheduleService.updateMemberSchedule(schedule, scheduleUpdateRequest.members());

		//이전 일정의 반복과 관련된
		List<Schedule> modifySchedules = modifyRepetitionSchedule(schedule, scheduleUpdateRequest.modificationType());
		for (Schedule modifySchedule : modifySchedules) {
			modifySchedule.delete();
		}

		Repetition updatedRepetition =
			(scheduleUpdateRequest.repetition() == null) ? null : scheduleUpdateRequest.repetition().toEntity();
		schedule.updateRepetition(updatedRepetition);

		createRepetitionSchedules(schedule, updatedRepetition);

		return ScheduleResponse.of(schedule, members);
	}

	@Override
	@Transactional
	public ScheduleIdListResponse deleteSchedule(int memberId, int scheduleId, ModificationType modificationType) {
		Schedule schedule = ScheduleServiceUtils.findById(scheduleRepository, scheduleId);

		//스케줄에 속한 멤버인지 확인(권한 확인)
		memberScheduleService.validateMemberSchedule(schedule, memberId);

		List<Schedule> deleteSchedules = modifyRepetitionSchedule(schedule, modificationType);
		deleteSchedules.add(schedule);

		List<ScheduleIdResponse> scheduleIdResponses = new ArrayList<>();

		for (Schedule deleteSchedule : deleteSchedules) {
			deleteSchedule.delete();
			scheduleIdResponses.add(ScheduleIdResponse.from(deleteSchedule));
		}

		//전체 삭제일 경우에는 관련 반복도 삭제
		if (modificationType.equals(ModificationType.ALL)) {
			repetitionService.deleteRepetition(schedule.getRepetition());
		}
		return ScheduleIdListResponse.from(scheduleIdResponses);
	}

	@Override
	public ScheduleResponse getScheduleByScheduleId(int memberId, int scheduleId) {
		Schedule schedule = ScheduleServiceUtils.findById(scheduleRepository, scheduleId);

		memberScheduleService.validateMemberSchedule(schedule, memberId);

		return ScheduleResponse.of(schedule, memberScheduleService.getMembersBySchedule(schedule));
	}

	private void createRepetitionSchedules(Schedule originSchedule, Repetition repetition) {
		if (repetition == null) {
			return;
		}

		LocalDate repetitionStartDate = repetition.getRepetitionStartDate();
		LocalDate repetitionEndDate =
			repetition.getRepetitionEndDate() == null ? repetitionStartDate.plusYears(3) :
				repetition.getRepetitionEndDate();

		LocalDateTime startDateTime, endDateTime;
		startDateTime = originSchedule.getStartDate();
		endDateTime = originSchedule.getEndDate();

		List<Schedule> addSchedules = new ArrayList<>();

		switch (repetition.getRepetitionCycle()) {
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
							case 0 -> DayOfWeek.SUNDAY;
							case 1 -> DayOfWeek.MONDAY;
							case 2 -> DayOfWeek.TUESDAY;
							case 3 -> DayOfWeek.WEDNESDAY;
							case 4 -> DayOfWeek.THURSDAY;
							case 5 -> DayOfWeek.FRIDAY;
							case 6 -> DayOfWeek.SATURDAY;
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

	private List<Schedule> modifyRepetitionSchedule(Schedule originalSchedule,
		ModificationType modificationType) {
		List<Schedule> modifySchedules = new ArrayList<>();

		switch (modificationType) {
			case NOW -> {
				break;
			}
			case AFTER -> {
				modifySchedules.addAll(
					scheduleRepository.findAllByRepetitionAndStartDateAfter(originalSchedule.getRepetition(),
						originalSchedule.getStartDate()));
				break;
			}
			case ALL -> {
				modifySchedules.addAll(
					scheduleRepository.findAllByRepetitionAndStartDateBefore(originalSchedule.getRepetition(),
						originalSchedule.getStartDate()));
				modifySchedules.addAll(
					scheduleRepository.findAllByRepetitionAndStartDateAfter(originalSchedule.getRepetition(),
						originalSchedule.getStartDate()));
				break;
			}
			default -> throw new ScheduleException(ScheduleErrorCode.NOT_APPROPRIATE_MODIFICATION_TYPE);
		}

		return modifySchedules;
	}

}
