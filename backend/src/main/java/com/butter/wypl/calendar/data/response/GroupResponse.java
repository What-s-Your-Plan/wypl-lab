package com.butter.wypl.calendar.data.response;

import com.butter.wypl.global.common.Color;
import com.fasterxml.jackson.annotation.JsonProperty;

public record GroupResponse(

	@JsonProperty("group_id")
	int groupId,

	Color color,

	String title
) {
}
