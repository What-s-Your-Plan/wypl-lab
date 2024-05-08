package com.butter.wypl.group.data.request;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonProperty;

public record GroupCreateRequest(
	String name,
	String description,
	@JsonProperty("member_id_list")
	Set<Integer> memberIdList

) {

}
