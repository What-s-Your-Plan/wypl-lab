import { useParams } from 'react-router-dom';
import DetailBlockList from '@/components/review/view/DetailBlockList';
import { Container } from '@/components/common/Container';

function ReviewDetailPage() {
  const { reviewId } = useParams();

  return (
    <div className="container flex items-center   justify-center ss:max-sm:block h-dvh ">
      {reviewId && <DetailBlockList reviewId={reviewId} />}
    </div>
  );
}

export default ReviewDetailPage;
