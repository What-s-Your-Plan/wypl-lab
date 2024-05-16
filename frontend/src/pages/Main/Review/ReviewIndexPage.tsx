import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { Review } from '@/@types/ReviewResponse';
import getReviewList from '@/services/review/getReviewList';

import { Container, WhiteContainer } from '@/components/common/Container';
import ReviewThumbnail from '@/components/review/thumbnail/ReviewThumbnail';
import { Divider } from '@/components/common/Divider';
import NoContentAnimation from '@/components/animation/NoContent';

function ReviewIndexPage() {
  const navigator = useNavigate();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [lastId, setLastId] = useState<string>('');
  const [hasNext, setHasNext] = useState<boolean>(true);
  const [viewType, setViewType] = useState<'NEWEST' | 'OLDEST'>('NEWEST');

  const renderReviewIndex = () => {
    if (reviews.length === 0) {
      return (
        <div className="flex justify-center items-center text-center w-full h-full">
          <NoContentAnimation />
        </div>
      );
    }
    return reviews.map((review, index) => {
      return (
        <WhiteContainer
          key={index}
          className="h-full"
          $width="400"
          $height="twoThird"
          onClick={() => navigator(`/review/${review.review_id}`)}
        >
          <ReviewThumbnail
            blockType={review.thumbnail_content?.blockType}
            thumbnailContent={review.thumbnail_content}
          />
          <Divider />
          <div className="font-semibold mt-2">{review.title}</div>
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
    if (response.reviews.length < 24) setHasNext(false);
  };

  useEffect(() => {
    fetchReviewList();
    setViewType('NEWEST');
  }, []);

  return (
    <div className="container flex items-center   justify-center ss:max-sm:block h-dvh">
      <Container $width="1200" className="h-[90%]">
        <div className="text-lg font-semibold">회고록</div>
        <div className="scrollBar flex gap-6 gap-x-10 flex-wrap justify-start content-start pl-10 px-4 mt-4 h-[95%]">
          {renderReviewIndex()}
          {hasNext && (
            <div className="flex justify-center text-center">
              <div className="cursor-pointer">더 보기</div>
            </div>
          )}
        </div>
      </Container>
    </div>
  );
}

export default ReviewIndexPage;
