package com.butter.wypl.infrastructure.weather.data;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

public record OpenWeatherResponse(
		@JsonProperty("weather")
		List<WeatherResponse> weather,
		@JsonProperty("main")
		MainResponse main,
		@JsonProperty("dt")
		long dateTime
) {

	public static WeatherResponse ofByWeatherResponse(final int id, final String main, final String desc) {
		return new WeatherResponse(id, main, desc);
	}

	public static MainResponse fromByMainResponse(final float temp) {
		return new MainResponse(temp);
	}

	public int getWeatherId() {
		return weather.get(0).id();
	}

	public String getWeatherName() {
		return weather.get(0).main();
	}

	public String getWeatherDescription() {
		return weather.get(0).description();
	}

	public float getTemperature() {
		return main.temp();
	}

	private record WeatherResponse(
			@JsonProperty("id")
			int id,
			@JsonProperty("main")
			String main,
			@JsonProperty("description")
			String description
	) {
	}

	private record MainResponse(
			@JsonProperty("temp")
			float temp
	) {
	}
}
