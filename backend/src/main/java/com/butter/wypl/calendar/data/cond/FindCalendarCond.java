package com.butter.wypl.calendar.data.cond;

import java.time.LocalDateTime;

public record FindCalendarCond(
		int memberId,
		Integer labelId,
		LocalDateTime startDate,
		LocalDateTime lastDate
) {
}
