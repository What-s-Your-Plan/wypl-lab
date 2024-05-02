package com.butter.wypl.infrastructure.weather;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum WeatherRegion {
	KOREA("Asia/Seoul", "Seoul"),
	WEST_USA("America/Los_Angeles", "Los Angeles"),
	EAST_USA("America/New_York", "New York"),
	ENGLAND("Europe/London", "London");

	private final String timeZone;
	private final String city;
}
