package com.butter.wypl.sidetab.fixture;

import java.util.List;

import com.butter.wypl.infrastructure.weather.WeatherRegion;
import com.butter.wypl.infrastructure.weather.data.OpenWeatherCond;
import com.butter.wypl.infrastructure.weather.data.OpenWeatherResponse;
import com.butter.wypl.sidetab.data.response.WeatherWidgetResponse;
import com.butter.wypl.sidetab.domain.cache.WeatherWidget;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum WeatherFixture {
	DEGREE_KR_KOREA(WeatherRegion.KOREA, true, true,
			800, 1, "14:20 갱신", "Clear", "맑음",
			15.51F, 26.72F, 20.75F, 1714694049),
	FAHRENHEIT_EN_USA(WeatherRegion.EAST_USA, false, false,
			800, 1, "14:20 갱신", "Clear", "맑음",
			297.34F, 294.84F, 298.81F, 1714694049);

	private final WeatherRegion weatherRegion;
	private final boolean isMetric;
	private final boolean isLangKr;

	private final int responseWeatherId;
	private final int weatherId;
	private final String updateTime;
	private final String weatherMain;
	private final String desc;
	private final float temp;
	private final float maxTemp;
	private final float minTemp;
	private final long dt;

	public OpenWeatherCond toCond() {
		return OpenWeatherCond.of(weatherRegion, isMetric, isLangKr);
	}

	public OpenWeatherResponse toOpenWeatherResponse() {
		return new OpenWeatherResponse(
				List.of(OpenWeatherResponse.ofByWeatherResponse(responseWeatherId, weatherMain, desc)),
				OpenWeatherResponse.fromByMainResponse(temp, maxTemp, minTemp),
				dt
		);
	}

	public OpenWeatherResponse toInvalidOpenWeatherResponse() {
		return new OpenWeatherResponse(
				List.of(OpenWeatherResponse.ofByWeatherResponse(-1, weatherMain, desc)),
				OpenWeatherResponse.fromByMainResponse(temp, maxTemp, minTemp),
				dt
		);
	}

	public WeatherWidget toWeatherWidget() {
		return new WeatherWidget(
				weatherRegion,
				responseWeatherId,
				Math.round(temp),
				Math.round(maxTemp),
				Math.round(minTemp),
				updateTime,
				weatherMain,
				desc
		);
	}

	public WeatherWidgetResponse toWeatherWidgetResponse() {
		return new WeatherWidgetResponse(
				weatherRegion.getCityKr(),
				weatherId,
				Math.round(temp),
				Math.round(maxTemp),
				Math.round(minTemp),
				updateTime,
				weatherMain,
				desc
		);
	}
}
