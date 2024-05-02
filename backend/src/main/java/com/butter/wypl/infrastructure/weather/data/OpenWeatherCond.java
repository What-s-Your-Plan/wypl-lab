package com.butter.wypl.infrastructure.weather.data;

import com.butter.wypl.infrastructure.weather.WeatherRegion;

public record OpenWeatherCond(
		WeatherRegion city,
		boolean isMetric,
		boolean isLangKr
) {
}
