package com.butter.wypl.sidetab.service;

import com.butter.wypl.auth.domain.AuthMember;
import com.butter.wypl.sidetab.domain.cache.WeatherWidget;

public interface WeatherWidgetService {
	WeatherWidget findCurrentWeather(final AuthMember authMember);
}
