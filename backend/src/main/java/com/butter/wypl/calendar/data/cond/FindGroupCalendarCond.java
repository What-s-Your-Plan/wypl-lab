package com.butter.wypl.calendar.data.cond;

import java.time.LocalDateTime;

public record FindGroupCalendarCond(
		int groupId,
		int memberId,
		LocalDateTime startDate,
		LocalDateTime lastDate
) {
}
