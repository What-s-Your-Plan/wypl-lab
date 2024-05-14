import { useNavigate } from 'react-router-dom';
import useReviewStore from '@/stores/ReviewStore';

import postReview from '@/services/review/postReview';

import RTitle from './RTitle';
import RSchedule from './RSchedule';
import ReviewWrite from './ReviewWrite';
import Button from '@/components/common/Button';
import { Divider, DividerLabel } from '@/components/common/Divider';

import * as S from '@/components/common/Container';
import Cancel from '@/assets/icons/x.svg';
import Save from '@/assets/icons/save.svg';
import { useEffect } from 'react';

function WriteBlockList() {
  const reviewStore = useReviewStore();
  const navigator = useNavigate();

  const renderBlockList = () => {
    const blockList = reviewStore.contents;
    return blockList.map((block, index) => {
      return <ReviewWrite key={index} index={index} content={block} />;
    });
  };

  const handleDropItem = (event: React.DragEvent) => {
    event.preventDefault();
    const dragItem = event.dataTransfer.getData('blockType');
    console.log(event.dataTransfer.getData('blockType'));
    if (dragItem) {
      reviewStore.addContent(
        reviewStore.contents.length - 1,
        dragItem as ReviewType,
      );
    }
  };

  const handleCancelClick = () => {
    navigator(-1);
  };

  const handleSaveClick = async () => {
    const body = {
      title: reviewStore.title,
      schedule_id: reviewStore.scheduleId,
      contents: reviewStore.contents,
    };
    const reviewId = await postReview(body);
    console.log(reviewId);
    if (reviewId) {
      reviewStore.resetReview();
      navigator(`/review/${reviewId}`);
    }
  };

  const preventClose = (e: BeforeUnloadEvent) => {
    e.preventDefault();
    e.returnValue = '';
  };

  useEffect(() => {
    window.addEventListener('beforeunload', preventClose);
    return () => {
      window.removeEventListener('beforeunload', preventClose);
    };
  }, []);

  return (
    <S.Container $width="right" className="scrollBar flex flex-col gap-4">
      <div>
        <span className="float-end flex gap-2">
          <Button
            $size="lg"
            $width="90px"
            $bgColor="labelCharcoal"
            $textColor="white"
            onClick={handleCancelClick}
          >
            <img src={Cancel} alt="취소" className="w-5 mr-2 whiteImg" />
            취소
          </Button>
          <Button $size="lg" $width="90px" onClick={handleSaveClick}>
            <img src={Save} alt="저장" className="w-5 mr-2" />
            저장
          </Button>
        </span>
        <div>
          <RTitle $title={reviewStore.title} $setTitle={reviewStore.setTitle} />
          <RSchedule scheduleId={reviewStore.scheduleId} />
        </div>
      </div>
      <Divider />
      <div
        onDragOver={(event) => {
          event.preventDefault();
        }}
        onDrop={handleDropItem}
      >
        {reviewStore.contents.length === 0 ? (
          <S.WhiteContainer $width="900">
            <DividerLabel>블록을 추가해주세요</DividerLabel>
          </S.WhiteContainer>
        ) : (
          renderBlockList()
        )}
      </div>
    </S.Container>
  );
}

export default WriteBlockList;
