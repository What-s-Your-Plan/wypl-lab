import useReviewStore from '@/stores/ReviewStore';

import RTitle from './RTitle';
import RSchedule from './RSchedule';
import ReviewWrite from './ReviewWrite';

import * as S from '@/components/common/Container';
import { Divider } from '@/components/common/Divider';

function WriteBlockList() {
  const reviewStore = useReviewStore();

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

  return (
    <S.Container $width="800" className="scrollBar flex flex-col gap-4">
      <div>
        <RTitle $title={reviewStore.title} $setTitle={reviewStore.setTitle} />
        <RSchedule $scheduleId={reviewStore.scheduleId} />
      </div>
      <Divider />
      <div
        onDragOver={(event) => {
          event.preventDefault();
        }}
        onDrop={handleDropItem}
      >
        {renderBlockList()}
      </div>
    </S.Container>
  );
}

export default WriteBlockList;
