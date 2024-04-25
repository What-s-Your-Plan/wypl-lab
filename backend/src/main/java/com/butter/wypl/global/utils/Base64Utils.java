package com.butter.wypl.global.utils;

import java.util.Base64;

public class Base64Utils {

	private Base64Utils() {
	}

	public static String decode(String base64) {
		byte[] bytes = Base64.getDecoder().decode(base64);
		return new String(bytes);
	}
}
