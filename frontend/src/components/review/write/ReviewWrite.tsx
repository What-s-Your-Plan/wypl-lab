import {
  Content,
  TextContent,
  PictureContent,
  EmotionContent,
  WeatherContent,
  KPTContent,
  FourFContent,
} from '@/objects/Content';

import RText from './RText';
import RPicture from './RPicture';
import REmotion from './REmotion';
import RWeather from './RWeather';
import RKpt from './RKpt';
import R4F from './R4F';

type ReviewWriteProps = {
  $index: number;
  $content: Content;
};

//type에 맞는 컴포넌트를 생성하기 위한 블록
function ReviewWrite({ $index, $content }: ReviewWriteProps) {
  const renderBlock = () => {
    switch ($content.blockType) {
      case 'text':
        if ($content instanceof TextContent) {
          return <RText $index={$index} $content={$content} />;
        } else {
          throw new Error('Content for text block is missing text property');
        }
      case 'picture':
        if ($content instanceof PictureContent) {
          return <RPicture $content={$content} />;
        } else {
          throw new Error('Content for text block is missing text property');
        }
      case 'emotion':
        if ($content instanceof EmotionContent) {
          return <REmotion $content={$content} />;
        } else {
          throw new Error('Content for text block is missing text property');
        }
      case 'weather':
        if ($content instanceof WeatherContent) {
          return <RWeather $content={$content} />;
        } else {
          throw new Error('Content for text block is missing text property');
        }
      case 'kpt':
        if ($content instanceof KPTContent) {
          return <RKpt $content={$content} />;
        } else {
          throw new Error('Content for text block is missing text property');
        }
      case '4f':
        if ($content instanceof FourFContent) {
          return <R4F $content={$content} />;
        } else {
          throw new Error('Content for text block is missing text property');
        }
      default:
        return null;
    }
  };
  return <div>{renderBlock()}</div>;
}

export default ReviewWrite;
