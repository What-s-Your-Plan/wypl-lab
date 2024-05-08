package com.butter.wypl.todo.data.response;

import com.butter.wypl.member.domain.Member;
import com.butter.wypl.todo.domain.Todo;
import com.fasterxml.jackson.annotation.JsonProperty;

public record TodoResponse(
	@JsonProperty("id")
	int id,
	@JsonProperty("member_id")
	int memberId,
	@JsonProperty("nick_name")
	String nickName,
	@JsonProperty("content")
	String content,
	@JsonProperty("is_completed")
	boolean isCompleted
) {

	public static TodoResponse of(Todo todo, Member member) {
		return new TodoResponse(
			todo.getId(),
			member.getId(),
			member.getNickname(),
			todo.getContent(),
			todo.isCompleted()
		);
	}
}
