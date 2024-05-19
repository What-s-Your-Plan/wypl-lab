package com.butter.wypl.sidetab.service;

import com.butter.wypl.auth.domain.AuthMember;
import com.butter.wypl.sidetab.data.response.WeatherWidgetResponse;

public interface WeatherWidgetService {
	WeatherWidgetResponse findCurrentWeather(
			final AuthMember authMember,
			final boolean isMetric,
			final boolean isLangKr
	);
}
