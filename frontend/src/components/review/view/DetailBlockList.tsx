import {
  TextContent,
  PictureContent,
  EmotionContent,
  WeatherContent,
  KPTContent,
  FourFContent,
} from '@/objects/Content';
import { ReviewResponse } from '@/@types/ReviewResponse';

import VTitle from './VTitle';
import VEmotion from './VEmotion';
import VText from './VText';
import VPicture from './VPicture';
import VWeather from './VWeather';
import VKpt from './VKpt';
import V4F from './V4F';
import VSchedule from './VSchedule';
import { Divider } from '@/components/common/Divider';

type DetailBlockListProps = {
  detail: ReviewResponse;
};

function DetailBlockList({ detail }: DetailBlockListProps) {
  const renderDetailBlock = () => {
    return detail?.contents.map((content, index) => {
      switch (content.blockType) {
        case 'text':
          return <VText key={index} content={content as TextContent} />;
        case 'picture':
          return <VPicture key={index} content={content as PictureContent} />;
        case 'emotion':
          return <VEmotion key={index} content={content as EmotionContent} />;
        case 'weather':
          return <VWeather key={index} content={content as WeatherContent} />;
        case 'kpt':
          return <VKpt key={index} content={content as KPTContent} />;
        case '4f':
          return <V4F key={index} content={content as FourFContent} />;
        default:
          return null;
      }
    });
  };

  return (
    <div className="w-1300 -mt-2">
      <div className="scrollBar flex flex-col items-center  h-[85vh]">
        <VTitle title={detail.title} />
        <VSchedule schedule={detail.schedule} />
        <div className="w-900 mb-4">
          <Divider />
        </div>
        {renderDetailBlock()}
      </div>
    </div>
  );
}

export default DetailBlockList;
