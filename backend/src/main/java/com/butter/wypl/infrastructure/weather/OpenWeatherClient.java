package com.butter.wypl.infrastructure.weather;

import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;

import com.butter.wypl.global.annotation.InfraComponent;
import com.butter.wypl.infrastructure.weather.data.OpenWeatherCond;
import com.butter.wypl.infrastructure.weather.data.OpenWeatherResponse;
import com.butter.wypl.infrastructure.weather.properties.OpenWeatherProperties;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@InfraComponent
public class OpenWeatherClient {

	private final RestTemplate restTemplate;
	private final OpenWeatherProperties openWeatherProperties;

	public OpenWeatherResponse fetchWeather(OpenWeatherCond cond) {
		ResponseEntity<OpenWeatherResponse> response = restTemplate.getForEntity(
				getUrl(cond),
				OpenWeatherResponse.class
		);

		System.out.println(response.getStatusCode());

		return response.getBody();
	}

	private String getUrl(OpenWeatherCond cond) {
		StringBuilder url = new StringBuilder(openWeatherProperties.getBaseUrl())
				.append("?appid=")
				.append(openWeatherProperties.getKey());

		addParamByCity(url, cond.city());
		addParamByLang(url, cond.isLangKr());
		addParamByUnits(url, cond.isMetric());

		return url.toString();
	}

	private void addParamByCity(StringBuilder url, WeatherRegion region) {
		url.append("&q=").append(region.getCity());
	}

	private void addParamByLang(StringBuilder url, boolean isLangKr) {
		if (isLangKr) {
			url.append("&lang=kr");
		}
	}

	private void addParamByUnits(StringBuilder url, boolean isMetric) {
		if (isMetric) {
			url.append("&units=metric");
		}
	}
}
