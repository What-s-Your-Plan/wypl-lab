package com.butter.wypl.schedule.data.response;

import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

import com.butter.wypl.label.domain.Label;
import com.butter.wypl.member.domain.Member;
import com.butter.wypl.schedule.domain.Category;

public record ScheduleResponse(
	int scheduleId,
	String title,
	String description,
	LocalDateTime startDate,
	LocalDateTime endDate,
	Category category,
	int ownerId,
	LocalTime alarmTime,
	RepetitionResponse repetition,
	Label label, //FIXME : 라벨 응답으로 바꿔야 됨
	int memberCount,
	List<Member> members //FIXME : 멤버 응답으로 바꿔야됨
) {

}
