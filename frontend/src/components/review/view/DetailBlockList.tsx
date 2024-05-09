import { useEffect, useState } from 'react';

import getReviewDetail from '@/services/review/getReviewDetail';
import { ReviewResponse } from '@/@types/ReviewResponse';
import VTitle from './VTitle';
import VEmotion from './VEmotion';
import { EmotionContent } from '@/objects/Content';

type DetailBlockListProps = {
  reviewId: string;
};

function DetailBlockList({ reviewId }: DetailBlockListProps) {
  const [detail, setDetail] = useState<ReviewResponse>();
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
    <div>
      {detail && (
        <div>
          <VTitle title={detail.title} />
          <VEmotion content={detail.contents[2] as EmotionContent} />
        </div>
      )}
    </div>
  );
}

export default DetailBlockList;
