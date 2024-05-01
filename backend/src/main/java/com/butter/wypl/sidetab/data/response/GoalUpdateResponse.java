package com.butter.wypl.sidetab.data.response;

import com.fasterxml.jackson.annotation.JsonProperty;

public record GoalUpdateResponse(
		@JsonProperty("content")
		String content
) {
}
