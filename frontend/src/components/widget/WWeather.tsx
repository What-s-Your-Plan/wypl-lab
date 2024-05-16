import { useEffect, useState } from 'react';

import getWeather from '@/services/widget/getWeather';

import Cloud from '@/assets/icons/weather/cloud.svg';
import CloudAngledRain from '@/assets/icons/weather/cloudAngledRain.svg';
import CloudAngledRainZap from '@/assets/icons/weather/cloudAngledRainZap.svg';
import CloudSnow from '@/assets/icons/weather/cloudSnow.svg';
import Moon from '@/assets/icons/weather/moon.svg';
import Sun from '@/assets/icons/weather/sun.svg';
import Tornado from '@/assets/icons/weather/tornado.svg';
import MistSun from '@/assets/icons/weather/mistSun.svg';
import MistMoon from '@/assets/icons/weather/mistMoon.svg';

function WWeather() {
  const [weather, setWeather] = useState<Weather>();

  const renderWeatherIcon = (weather_id: number) => {
    switch (weather_id) {
      case 1:
        if (weather?.is_sunrise) return Sun;
        return Moon;
      case 2:
        return Cloud;
      case 3:
        return CloudAngledRain;
      case 4:
        return CloudAngledRainZap;
      case 5:
        return CloudSnow;
      case 6:
        if (weather?.is_sunrise) return MistSun;
        return MistMoon;
      case 7:
        return CloudAngledRain;
      case 8:
        return Tornado;
      default:
        return Moon;
    }
  };

  const getFontSize = (desc: string) => {
    if (!desc) return 'text-base'; // 기본 폰트 사이즈
    const length = desc.length;
    if (length < 4) return 'text-base';
    if (length < 6) return 'text-sm';
    return 'text-xs'; // 긴 텍스트에 대한 작은 폰트 사이즈
  };

  useEffect(() => {
    const fetchWeather = async () => {
      const weather = await getWeather();
      setWeather(weather);
    };

    fetchWeather();
  }, []);

  return (
    <div>
      {weather ? (
        <div>
          <div className="flex justify-between">
            <div className="text-xs">{weather?.city}</div>
            <div className="text-xs">{weather?.update_time}</div>
          </div>
          <div className="flex">
            <div className="flex flex-col text-center">
              <img
                src={renderWeatherIcon(weather?.weather_id)}
                alt="날씨"
                className="-mt-2"
              />
              <span className={`-mt-2 ${getFontSize(weather?.desc)}`}>
                {weather?.desc}
              </span>
            </div>
            <div className="flex flex-col justify-center items-center">
              <div>
                <span className="text-3xl font-semibold">{weather?.temp}</span>
                <span>℃</span>
              </div>
              <div className="text-xs">
                <span>
                  {weather?.min_temp}℃/{weather?.max_temp}℃
                </span>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>날씨를 확인할 수 없어요ㅠㅠ</div>
      )}
    </div>
  );
}

export default WWeather;
