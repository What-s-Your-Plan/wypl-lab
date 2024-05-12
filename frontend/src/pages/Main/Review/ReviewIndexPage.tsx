import { useEffect, useState } from 'react';

import { Review } from '@/@types/ReviewResponse';
import getReviewList from '@/services/review/getReviewList';

import { Container, WhiteContainer } from '@/components/common/Container';
import ReviewThumbnail from '@/components/review/thumbnail/ReviewThumbnail';

function ReviewIndexPage() {
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
        <WhiteContainer key={index} $width="300" $height="half">
          <ReviewThumbnail
            blockType={review.thumbnail_content?.blockType}
            thumbnailContent={review.thumbnail_content}
          />
          <div>{review.title}</div>
        </WhiteContainer>
      );
    });
  };

  const fetchReviewList = async () => {
    const response = await getReviewList(viewType, lastId);
    setReviews([...reviews, ...response.reviews]);
    setLastId(response.lastId);
  };

  useEffect(() => {
    fetchReviewList();
    setViewType('NEWEST');
  }, []);

  return (
    <div className="container flex items-center ss:max-sm:block h-dvh">
      <Container $width="1200" className="h-[90%]">
        {renderReviewIndex()}
      </Container>
    </div>
  );
}

export default ReviewIndexPage;
