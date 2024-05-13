import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Review } from '@/@types/ReviewResponse';
import getReviewList from '@/services/review/getReviewList';

import { Container, WhiteContainer } from '@/components/common/Container';
import ReviewThumbnail from '@/components/review/thumbnail/ReviewThumbnail';
import { Divider } from '@/components/common/Divider';

function ReviewIndexPage() {
  const navigator = useNavigate();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [lastId, setLastId] = useState<string>('');
  const [viewType, setViewType] = useState<'NEWEST' | 'OLDEST'>('NEWEST');

  const renderReviewIndex = () => {
    if (reviews.length === 0) {
      return (
        <div className="flex justify-center items-center text-center h-full">
          <div>작성된 회고록이 없습니다</div>
        </div>
      );
    }
    return reviews.map((review, index) => {
      return (
        <WhiteContainer
          key={index}
          $width="1300"
          $height="twoThird"
          onClick={() => navigator(`/review/${review.review_id}`)}
        >
          <ReviewThumbnail
            blockType={review.thumbnail_content?.blockType}
            thumbnailContent={review.thumbnail_content}
          />
          <Divider />
          <div className="font-semibold">{review.title}</div>
        </WhiteContainer>
      );
    });
  };

  const fetchReviewList = async () => {
    const response = await getReviewList(viewType, lastId);
    const last =
      response.reviews.length > 0
        ? response.reviews[response.reviews.length - 1].review_id
        : lastId;
    setReviews([...reviews, ...response.reviews]);
    setLastId(last);
  };

  useEffect(() => {
    fetchReviewList();
    setViewType('NEWEST');
  }, []);

  return (
    <div className="container flex items-center ss:max-sm:block h-dvh">
      <Container $width="1200" className="h-[90%]">
        <div className="text-lg font-semibold">회고록</div>
        <div className="grid gap-6 grid-cols-3 grid-rows-3 p-6">
          {renderReviewIndex()}
        </div>
      </Container>
    </div>
  );
}

export default ReviewIndexPage;
