import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import ViewBlockList from '@/components/review/view/ViewBlockList';
import WriteBlockList from '@/components/review/write/WriteBlockList';

import useReviewStore from '@/stores/ReviewStore';
import getReviewDetail from '@/services/review/getReviewDetail';
import { Content } from '@/objects/Content';

function ReviewModifyPage() {
  const { scheduleId, reviewId } = useParams();
  const reviewStore = useReviewStore();

  useEffect(() => {
    const fetchReviewDetail = async () => {
      if (reviewId) {
        const response = await getReviewDetail(reviewId);
        const mappedResponse = {
          ...response,
          contents: response.contents.map((content: Content) => ({
            ...content,
            blockType: content.blockType as ReviewType,
          })),
        };
        reviewStore.setTitle(mappedResponse.title);
        reviewStore.setContents(mappedResponse.contents);
      }
    };
    if (scheduleId) reviewStore.setScheduleId(Number(scheduleId));
    if (reviewId) {
      fetchReviewDetail();
    }
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

export default ReviewModifyPage;
