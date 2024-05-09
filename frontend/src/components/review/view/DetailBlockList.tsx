import { useEffect, useState } from 'react';

import getReviewDetail from '@/services/review/getReviewDetail';
import { ReviewResponse } from '@/@types/ReviewResponse';
import {
  TextContent,
  PictureContent,
  EmotionContent,
  WeatherContent,
  KPTContent,
  FourFContent,
} from '@/objects/Content';
import VTitle from './VTitle';
import VEmotion from './VEmotion';
import VText from './VText';
import VPicture from './VPicture';
import VWeather from './VWeather';
import VKpt from './VKpt';
import V4F from './V4F';
import VSchedule from './VSchedule';
import { Divider } from '@/components/common/Divider';
import { Container } from '@/components/common/Container';

type DetailBlockListProps = {
  reviewId: string;
};

function DetailBlockList({ reviewId }: DetailBlockListProps) {
  const [detail, setDetail] = useState<ReviewResponse>();

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

  useEffect(() => {
    const fetchReviewDetail = async () => {
      if (reviewId) {
        const response = await getReviewDetail(reviewId);
        const mappedResponse = {
          ...response,
          contents: response.contents.map((content) => ({
            ...content,
            blockType: content.blockType as ReviewType,
          })),
        };
        setDetail(mappedResponse);
      }
    };
    fetchReviewDetail();
  }, []);

  return (
    <div className="w-1300">
      {detail && (
        <Container
          $width="1200"
          className="scrollBar flex flex-col items-center gap-4 h-[90vh] "
        >
          <VTitle title={detail.title} />
          <VSchedule schedule={detail.schedule} />
          <div className="w-900">
            <Divider />
          </div>
          {renderDetailBlock()}
        </Container>
      )}
    </div>
  );
}

export default DetailBlockList;
