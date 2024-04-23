package com.butter.wypl.member.exception;

import com.butter.wypl.global.exception.CustomException;
import com.butter.wypl.global.exception.ErrorCode;

public class MemberException extends CustomException {
	public MemberException(ErrorCode errorCode) {
		super(errorCode);
	}
}
