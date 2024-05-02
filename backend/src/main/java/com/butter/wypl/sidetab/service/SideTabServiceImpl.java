package com.butter.wypl.sidetab.service;

import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.butter.wypl.auth.domain.AuthMember;
import com.butter.wypl.infrastructure.weather.OpenWeatherClient;
import com.butter.wypl.infrastructure.weather.WeatherRegion;
import com.butter.wypl.infrastructure.weather.data.OpenWeatherCond;
import com.butter.wypl.infrastructure.weather.data.OpenWeatherResponse;
import com.butter.wypl.member.domain.Member;
import com.butter.wypl.member.repository.MemberRepository;
import com.butter.wypl.member.utils.MemberServiceUtils;
import com.butter.wypl.sidetab.data.request.DDayUpdateRequest;
import com.butter.wypl.sidetab.data.request.GoalUpdateRequest;
import com.butter.wypl.sidetab.data.response.DDayWidgetResponse;
import com.butter.wypl.sidetab.data.response.GoalWidgetResponse;
import com.butter.wypl.sidetab.domain.SideTab;
import com.butter.wypl.sidetab.domain.cache.WeatherWidget;
import com.butter.wypl.sidetab.domain.embedded.DDayWidget;
import com.butter.wypl.sidetab.domain.embedded.GoalWidget;
import com.butter.wypl.sidetab.repository.SideTabRepository;
import com.butter.wypl.sidetab.repository.WeatherWidgetRepository;
import com.butter.wypl.sidetab.utils.SideTabServiceUtils;

import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Transactional(readOnly = true)
@Service
public class SideTabServiceImpl implements
		SideTabLoadService, SideTabModifyService, WeatherWidgetService {

	private final SideTabRepository sideTabRepository;
	private final MemberRepository memberRepository;

	private final OpenWeatherClient weatherClient;
	private final WeatherWidgetRepository weatherWidgetRepository;

	@Transactional
	@Override
	public GoalWidgetResponse updateGoal(
			final AuthMember authMember,
			final int goalId,
			final GoalUpdateRequest goalUpdateRequest
	) {
		SideTab findSideTab = findSideTabWidget(authMember, goalId);

		GoalWidget goalWidget = GoalWidget.from(goalUpdateRequest.content());
		findSideTab.updateGoal(goalWidget);

		return GoalWidgetResponse.from(findSideTab);
	}

	@Override
	public GoalWidgetResponse findGoal(
			final AuthMember authMember,
			final int goalId
	) {
		SideTab findSideTab = findSideTabWidget(authMember, goalId);

		return GoalWidgetResponse.from(findSideTab);
	}

	@Transactional
	@Override
	public DDayWidgetResponse updateDDay(
			final AuthMember authMember,
			final int dDayId,
			final DDayUpdateRequest request
	) {
		SideTab findSideTab = findSideTabWidget(authMember, dDayId);

		DDayWidget dDayWidget = DDayWidget.of(request.title(), request.date());
		findSideTab.updateDDay(dDayWidget);

		return DDayWidgetResponse.from(findSideTab.getDDay());
	}

	@Override
	public DDayWidgetResponse findDDay(
			final AuthMember authMember,
			final int dDayId
	) {
		SideTab findSideTab = findSideTabWidget(authMember, dDayId);

		return DDayWidgetResponse.from(findSideTab.getDDay());
	}

	private SideTab findSideTabWidget(AuthMember authMember, int dDayId) {
		Member findMember = MemberServiceUtils.findById(memberRepository, authMember.getId());
		SideTab findSideTab = SideTabServiceUtils.findById(sideTabRepository, dDayId);
		MemberServiceUtils.validateOwnership(findMember, findSideTab.getMemberId());
		return findSideTab;
	}

	@Transactional
	@Override
	public WeatherWidget findCurrentWeather(final AuthMember authMember) {
		Member findMember = MemberServiceUtils.findById(memberRepository, authMember.getId());
		WeatherRegion weatherRegion = findMember.getWeatherRegion();

		return weatherWidgetRepository.findById(weatherRegion)
				.orElseGet(() -> saveWeatherWidget(weatherRegion));
	}

	public WeatherWidget saveWeatherWidget(WeatherRegion weatherRegion) {
		OpenWeatherCond cond = OpenWeatherCond.from(weatherRegion);
		OpenWeatherResponse response = weatherClient.fetchWeather(cond);

		String updateTime = getUpdateTime(weatherRegion);

		return new WeatherWidget(weatherRegion,
				response.getWeatherId(),
				cond.isMetric() ? response.getTemperature() + "°C" : response.getTemperature() + "°F",
				updateTime,
				response.getWeatherName(),
				response.getWeatherDescription());
	}

	private String getUpdateTime(WeatherRegion weatherRegion) {
		Instant instant = Instant.ofEpochMilli(System.currentTimeMillis());
		ZonedDateTime datetime = ZonedDateTime.ofInstant(instant, ZoneId.of(weatherRegion.getTimeZone()));
		DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("yyyy.MM.dd HH:mm 업데이트");
		return datetime.format(dateTimeFormatter);
	}
}
