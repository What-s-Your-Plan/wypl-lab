package com.butter.wypl.sidetab.data.response;

import com.butter.wypl.sidetab.domain.cache.WeatherWidget;
import com.fasterxml.jackson.annotation.JsonProperty;

public record WeatherWidgetResponse(
		@JsonProperty("city")
		String city,
		@JsonProperty("weather_id")
		int weatherId,
		@JsonProperty("temp")
		int temp,
		@JsonProperty("min_temp")
		int minTemp,
		@JsonProperty("max_temp")
		int maxTemp,
		@JsonProperty("update_time")
		String updateTime,
		@JsonProperty("main")
		String main,
		@JsonProperty("desc")
		String desc
) {
	public static WeatherWidgetResponse of(
			final WeatherWidget weatherWidget,
			final boolean isLangKr
	) {
		return new WeatherWidgetResponse(
				isLangKr ? weatherWidget.getWeatherRegion().getCityEn()
						: weatherWidget.getWeatherRegion().getCityKr(),
				weatherWidget.getWeatherId(),
				weatherWidget.getTemp(),
				weatherWidget.getTemp(),
				weatherWidget.getTemp(),
				weatherWidget.getUpdateTime(),
				weatherWidget.getMain(),
				weatherWidget.getDesc()
		);
	}
}
