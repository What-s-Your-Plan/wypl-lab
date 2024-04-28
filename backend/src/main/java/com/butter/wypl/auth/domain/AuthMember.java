package com.butter.wypl.auth.domain;

public class AuthMember {
	private final int id;

	private AuthMember(int id) {
		this.id = id;
	}

	public static AuthMember from(int id) {
		return new AuthMember(id);
	}
}
