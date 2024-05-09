import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import getReviewDetail from '@/services/review/getReviewDetail';
import { splitTTime } from '@/utils/DateUtils';

import { ReviewResponse } from '@/@types/ReviewResponse';

import DetailBlockList from '@/components/review/view/DetailBlockList';
import { Container } from '@/components/common/Container';
import Button from '@/components/common/Button';
import ArrowLeft from '@/assets/icons/arrowLeft.svg';
import MoreVertical from '@/assets/icons/moreVertical.svg';

function ReviewDetailPage() {
  const { reviewId } = useParams();
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
    <div className="container flex items-center   justify-center ss:max-sm:block h-dvh ">
      {detail && (
        <Container $width="1200" className="h-[90vh]">
          <div className="flex justify-between">
            <span>
              <Button $size="none" className="!bg-transparent">
                <img src={ArrowLeft} alt="뒤로가기" />
              </Button>
            </span>
            <div className="flex gap-2">
              <span className="text-sm">{splitTTime(detail.created_at)}</span>
              <span>
                <Button $size="none" className="!bg-transparent">
                  <img src={MoreVertical} alt="더보기" />
                </Button>
              </span>
            </div>
          </div>
          {reviewId && <DetailBlockList detail={detail} />}
        </Container>
      )}
    </div>
  );
}

export default ReviewDetailPage;
