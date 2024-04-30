package com.butter.wypl.schedule.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.transaction.annotation.Transactional;

import com.butter.wypl.global.annotation.FacadeService;
import com.butter.wypl.member.repository.MemberRepository;
import com.butter.wypl.member.utils.MemberServiceUtils;
import com.butter.wypl.schedule.data.response.MemberIdResponse;
import com.butter.wypl.schedule.data.response.MemberResponse;
import com.butter.wypl.schedule.domain.MemberSchedule;
import com.butter.wypl.schedule.domain.Schedule;
import com.butter.wypl.schedule.respository.MemberScheduleRepository;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Transactional
@FacadeService
public class MemberScheduleService {

	private final MemberScheduleRepository memberScheduleRepository;
	private final MemberRepository memberRepository;

	public List<MemberResponse> createMemberSchedule(Schedule schedule, List<MemberIdResponse> memberIdResponses) {
		List<MemberSchedule> memberSchedules = new ArrayList<>();

		for (MemberIdResponse memberIdResponse : memberIdResponses) {
			memberSchedules.add(
				MemberSchedule.builder()
					.member(MemberServiceUtils.findById(memberRepository, memberIdResponse.memberId()))
					.schedule(schedule)
					.build()
			);
		}

		List<MemberSchedule> savedMemberSchedules = memberScheduleRepository.saveAll(memberSchedules);

		return savedMemberSchedules.stream()
			.map(memberSchedule -> MemberResponse.from(memberSchedule.getMember()))
			.collect(Collectors.toList());
	}

	public List<MemberIdResponse> getMemberIdList(Schedule schedule) {
		return List.of();
	}
}
