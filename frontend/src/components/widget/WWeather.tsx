import Cloud from '@/assets/icons/weather/cloud.svg';
import CloudAngledRain from '@/assets/icons/weather/cloudAngledRain.svg';
import CloudAngledRainZap from '@/assets/icons/weather/cloudAngledRainZap.svg';
import CloudSnow from '@/assets/icons/weather/cloudSnow.svg';
// import Moon from '@/assets/icons/weather/moon.svg';
import Sun from '@/assets/icons/weather/sun.svg';
import Tornado from '@/assets/icons/weather/tornado.svg';
import MistSun from '@/assets/icons/weather/mistSun.svg';
// import MistMoon from '@/assets/icons/weather/mistMoon.svg';

function WWeather() {
  const weather = {
    location: '서울', // 서울 - 날씨 조회의 위치
    time: '16:00', // 16:00 기준 - 날씨 조회한 시간의 정보
    temp: {
      now: 24, // 24 - 현재 온도
      min: 13, // 8 - 최저 온도
      max: 25, // 28 - 최고 온도
    },
    weather_id: 1, // 200 - 날씨 식별자
    desc: '맑음',
  };

  const renderWeatherIcon = (weather_id: number) => {
    switch (weather_id) {
      case 1:
        return Sun;
      case 2:
        return Cloud;
      case 3:
        return CloudAngledRain;
      case 4:
        return CloudAngledRainZap;
      case 5:
        return CloudSnow;
      case 6:
        return MistSun;
      case 7:
        return CloudAngledRain;
      case 8:
        return Tornado;
      default:
        return Sun;
    }
  };

  return (
    <div>
      <div className="flex justify-between">
        <div className="text-xs">{weather.location}</div>
        <div className="text-xs">{weather.time}</div>
      </div>
      <div className="flex">
        <div className="flex flex-col text-center">
          <img
            src={renderWeatherIcon(weather.weather_id)}
            alt="날씨"
            className="-mt-2"
          />
          <span className="-mt-2">{weather.desc}</span>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div>
            <span className="text-3xl font-semibold">{weather.temp.now}</span>
            <span>℃</span>
          </div>
          <div className="text-xs">
            <span>
              {weather.temp.min}℃/{weather.temp.max}℃
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WWeather;
