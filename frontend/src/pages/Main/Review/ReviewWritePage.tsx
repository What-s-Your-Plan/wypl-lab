import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import ViewBlockList from '@/components/review/view/ViewBlockList';
import WriteBlockList from '@/components/review/write/WriteBlockList';
import useReviewStore from '@/stores/ReviewStore';

function ReviewWritePage() {
  const { scheduleId } = useParams();
  const { setScheduleId } = useReviewStore();

  useEffect(() => {
    if (scheduleId) setScheduleId(Number(scheduleId));
  }, []);

  return (
    <>
      <div className="container flex items-center ss:max-sm:block h-dvh">
        <ViewBlockList />
        <WriteBlockList />
      </div>
    </>
  );
}

export default ReviewWritePage;
