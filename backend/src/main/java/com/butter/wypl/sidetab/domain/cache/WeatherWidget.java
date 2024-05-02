package com.butter.wypl.sidetab.domain.cache;

import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import com.butter.wypl.infrastructure.weather.WeatherRegion;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import lombok.ToString;

@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@RedisHash(timeToLive = 60 * 60)
@ToString
public class WeatherWidget {
	@Id
	private WeatherRegion weatherRegion;
	private int weatherId;
	private String temp;
	private String updateTime;
	private String main;
	private String desc;
}
