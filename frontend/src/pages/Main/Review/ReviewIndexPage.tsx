import { useEffect, useState } from 'react';

import { Review } from '@/@types/ReviewResponse';
import getReviewList from '@/services/review/getReviewList';

function ReviewIndexPage() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [lastId, setLastId] = useState<string>('');
  const [viewType, setViewType] = useState<'NEWEST' | 'OLDEST'>('NEWEST');

  const fetchLabelList = async () => {
    const response = await getReviewList(viewType, lastId);
    setReviews([...reviews, response.reviews]);
    setLastId(response.lastId);
  };

  useEffect(() => {
    fetchLabelList();
    setViewType('NEWEST');
  }, []);

  return <div>ReviewIndexPage</div>;
}

export default ReviewIndexPage;
