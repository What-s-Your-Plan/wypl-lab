import * as S from '@/components/common/Container';

import useReviewStore from '@/stores/ReviewStore';

import RTitle from './RTitle';
import RSchedule from './RSchedule';
import ReviewWrite from './ReviewWrite';

import { Divider } from '@/components/common/Divider';

function WriteBlockList() {
  const reviewStore = useReviewStore();

  const renderBlockList = () => {
    const blockList = reviewStore.contents;
    return blockList.map((block, index) => {
      return <ReviewWrite index={index} content={block} />;
    });
  };

  return (
    <S.Container $width="800" className="scrollBar flex flex-col gap-4">
      <div>
        <RTitle $title={reviewStore.title} $setTitle={reviewStore.setTitle} />
        <RSchedule $scheduleId={reviewStore.scheduleId} />
      </div>
      <Divider />
      <div>{renderBlockList()}</div>
      <S.WhiteContainer
        $width="900"
        $height="quarter"
        onClick={() => reviewStore.addContent('weather')}
      >
        +
      </S.WhiteContainer>
    </S.Container>
  );
}

export default WriteBlockList;
