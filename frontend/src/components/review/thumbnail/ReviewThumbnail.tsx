import {
  Content,
  TextContent,
  PictureContent,
  EmotionContent,
  WeatherContent,
  KPTContent,
  FourFContent,
} from '@/objects/Content';
import TText from './TText';
import TPicture from './TPicture';
import TEmotion from './TEmotion';
import TWeather from './TWeather';
import TKpt from './TKpt';
import T4F from './T4F';

type ReviewThumbnailProps = {
  blockType: ReviewType;
  thumbnailContent: Content;
};

const ReviewThumbnail = ({
  blockType,
  thumbnailContent,
}: ReviewThumbnailProps) => {
  const renderThumbnail = () => {
    switch (blockType) {
      case 'text':
        return <TText thumbnailContent={thumbnailContent as TextContent} />;
      case 'picture':
        return (
          <TPicture thumbnailContent={thumbnailContent as PictureContent} />
        );
      case 'emotion':
        return (
          <TEmotion thumbnailContent={thumbnailContent as EmotionContent} />
        );
      case 'weather':
        return (
          <TWeather thumbnailContent={thumbnailContent as WeatherContent} />
        );
      case 'kpt':
        return <TKpt thumbnailContent={thumbnailContent as KPTContent} />;
      case '4f':
        return <T4F thumbnailContent={thumbnailContent as FourFContent} />;
      default:
        return <div></div>;
    }
  };
  return <div className="h-[80%]">{renderThumbnail()}</div>;
};

export default ReviewThumbnail;
