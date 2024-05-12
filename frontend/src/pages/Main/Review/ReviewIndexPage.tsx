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
    return reviews.map((review, index) => {
      return (
        <WhiteContainer key={index} $width="300" $height="half">
          <ReviewThumbnail
            blockType={review.thumbnail_content.blockType}
            thumbnailContent={review.thumbnail_content}
          />
          <div>{review.title}</div>
        </WhiteContainer>
      );
    });
  };

  const fetchLabelList = async () => {
    const response = await getReviewList(viewType, lastId);
    setReviews([...reviews, response.reviews]);
    setLastId(response.lastId);
  };

  useEffect(() => {
    fetchLabelList();
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
