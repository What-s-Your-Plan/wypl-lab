package com.butter.wypl.member.repository.query.data;

import org.springframework.web.bind.annotation.RequestParam;

public record MemberSearchCond(
		@RequestParam(name = "q")
		String query,
		@RequestParam(name = "size", defaultValue = "10")
		int size
) {
}
