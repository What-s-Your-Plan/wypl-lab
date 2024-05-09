import { WhiteContainer } from '@/components/common/Container';
import { WeatherContent } from '@/objects/Content';

type VWeatherProps = {
  content: WeatherContent;
};

function VEmotion({ content }: VWeatherProps) {
  return (
    <WhiteContainer $width="900">
      <img src={content.weather} alt="기분" className="w-10" />
      {content.description}
    </WhiteContainer>
  );
}

export default VEmotion;
