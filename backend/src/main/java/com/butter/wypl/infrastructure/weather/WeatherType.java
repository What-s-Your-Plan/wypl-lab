package com.butter.wypl.infrastructure.weather;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

import lombok.AllArgsConstructor;
import lombok.Getter;

/**
 * <a href="https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2">OPEN WEATHER ID</a>
 */
@AllArgsConstructor
@Getter
public enum WeatherType {
	THUNDERSTORM(new HashSet<>(List.of(200, 201, 202, 210, 211, 212, 221, 230, 231, 232)), "천둥"),
	DRIZZLE(new HashSet<>(List.of(300, 301, 302, 310, 311, 312, 313, 314, 321)), "이슬비"),
	RAIN(new HashSet<>(List.of(500, 501, 502, 503, 504, 511, 520, 521, 522, 531)), "비"),
	SNOW(new HashSet<>(List.of(600, 601, 602, 611, 612, 613, 615, 616, 620, 621, 622)), "눈"),
	MIST(new HashSet<>(List.of(701, 711, 721, 731, 741, 751, 761, 762)), "안개"),
	SQUALL(new HashSet<>(List.of(771)), "스콜"),
	TORNADO(new HashSet<>(List.of(781)), "태풍"),
	CLEAR(new HashSet<>(List.of(800)), "맑음"),
	CLOUDS(new HashSet<>(List.of(801, 802, 803, 804)), "구름");

	private final Set<Integer> ids;
	private final String description;
}
