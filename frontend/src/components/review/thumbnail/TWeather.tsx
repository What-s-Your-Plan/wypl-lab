import { WeatherContent } from '@/objects/Content';

import SunDim from '@/assets/icons/sunDim.svg';
import Sun from '@/assets/icons/weather/sun.svg';
import Cloud from '@/assets/icons/weather/cloud.svg';
import CloudAngledRain from '@/assets/icons/weather/cloudAngledRain.svg';
import CloudSnow from '@/assets/icons/weather/cloudSnow.svg';
import FastWind from '@/assets/icons/weather/fastWinds.svg';
import Question from '@/assets/icons/emoji/question.svg';

type TWeatherProps = {
  thumbnailContent: WeatherContent;
};

function TWeather({ thumbnailContent }: TWeatherProps) {
  const renderWeather = (emoji: string) => {
    switch (emoji) {
      case 'Sun':
        return <img src={Sun} alt="맑음" className="w-10" />;
      case 'Cloud':
        return <img src={Cloud} alt="흐림" className="w-10" />;
      case 'FastWind':
        return <img src={FastWind} alt="바람" className="w-10" />;
      case 'CloudAngledRain':
        return <img src={CloudAngledRain} alt="비" className="w-10" />;
      case 'CloudSnow':
        return <img src={CloudSnow} alt="눈" className="w-10" />;
      default:
        return <img src={Question} alt="날씨" className="w-10" />;
    }
  };
  return (
    <div>
      <div className="flex flex-row">
        <img src={SunDim} alt="날씨" className="w-5 mr-2" />
        <span>오늘의 날씨</span>
      </div>
      <div className="flex flex-row items-center gap-2 m-2">
        {renderWeather(thumbnailContent.weather)}
        {thumbnailContent.description}
      </div>
    </div>
  );
}

export default TWeather;
