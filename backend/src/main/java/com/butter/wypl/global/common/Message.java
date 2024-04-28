package com.butter.wypl.global.common;

import lombok.Data;

@Data
public class Message<T> {
	private String message;
	private T body;

	public Message() {
		this.message = null;
		this.body = null;
	}

	//메세지만 있는 경우
	public Message(final String message) {
		this.message = message;
		this.body = null;
	}

	//메세지와 데이터 모두 있는 경우
	public Message(final String message, T body) {
		this.message = message;
		this.body = body;
	}

	public static Message<Void> onlyMessage(
			final String message
	) {
		return new Message<>(message);
	}

	public static <T> Message<T> withBody(
			final String message,
			final T body
	) {
		return new Message<>(message, body);
	}
}
