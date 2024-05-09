import { useParams } from 'react-router-dom';
import DetailBlockList from '@/components/review/view/DetailBlockList';

function ReviewDetailPage() {
  const { reviewId } = useParams();

  return (
    <div>
      {reviewId && (
        <div>
          <DetailBlockList reviewId={reviewId} />
        </div>
      )}
    </div>
  );
}

export default ReviewDetailPage;
