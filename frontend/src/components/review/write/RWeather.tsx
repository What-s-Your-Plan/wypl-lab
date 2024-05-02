import { WhiteContainer } from '@/components/common/Container';
import { InputDefault } from '@/components/common/InputText';

import SunDim from '@/assets/icons/sunDim.svg';
import Sun from '@/assets/icons/weather/sun.svg';
import Cloud from '@/assets/icons/weather/cloud.svg';
import CloudAngledRain from '@/assets/icons/weather/cloudAngledRain.svg';
import CloudSnow from '@/assets/icons/weather/cloudSnow.svg';
import FastWind from '@/assets/icons/weather/fastWinds.svg';

function RWeather() {
  return (
    <WhiteContainer $width="900">
      <div className="flex flex-row">
        <img src={SunDim} alt="날씨" className="w-5 mr-2" />
        <span>오늘의 날씨</span>
      </div>
      <div className="flex flex-row items-center">
        <div>
          <div className="mx-10 mt-5 mb-1 flex gap-3">
            <button>
              <img src={Sun} alt="맑음" className="w-8" />
            </button>
            <button>
              <img src={Cloud} alt="흐림" className="w-8" />
            </button>
            <button>
              <img src={FastWind} alt="바람" className="w-8" />
            </button>
            <button>
              <img src={CloudAngledRain} alt="비" className="w-8" />
            </button>
            <button>
              <img src={CloudSnow} alt="눈" className="w-8" />
            </button>
          </div>
        </div>
        <div className="flex gap-4">
          <img src={Sun} alt="맑음" className="w-10" />
          <InputDefault
            placeholder="오늘의 날씨를 입력해주세요"
            className="!h-10"
          />
        </div>
      </div>
    </WhiteContainer>
  );
}

export default RWeather;
