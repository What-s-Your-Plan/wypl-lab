package com.butter.wypl.sidetab.data.response;

import com.butter.wypl.global.utils.LocalDateUtils;
import com.butter.wypl.sidetab.domain.embedded.DDayWidget;
import com.fasterxml.jackson.annotation.JsonProperty;

public record DDayWidgetResponse(
		@JsonProperty("title")
		String title,
		@JsonProperty("d_day")
		String dDay,
		@JsonProperty("date")
		String date
) {
	public static DDayWidgetResponse from(final DDayWidget dDay) {
		return new DDayWidgetResponse(dDay.getTitle(), dDay.getDDay(), LocalDateUtils.toString(dDay.getValue()));
	}
}
