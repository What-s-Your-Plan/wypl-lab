import * as S from '@/components/common/Container';

import useReviewStore from '@/stores/ReviewStore';

import RTitle from './RTitle';
import RSchedule from './RSchedule';
import RText from './RText';
import RWeather from './REmotion';
import RPicture from './RPicture';
import RKpt from './RKpt';
import R4F from './R4F';
import { Divider } from '@/components/common/Divider';

function WriteBlockList() {
  const reviewStore = useReviewStore();

  return (
    <S.Container $width="800" className="scrollBar flex flex-col gap-4">
      <div>
        <RTitle $title={reviewStore.title} $setTitle={reviewStore.setTitle} />
        <RSchedule $scheduleId={reviewStore.scheduleId} />
      </div>
      <Divider />
      <div>
        <RText />
        <RWeather />
        <RPicture />
        <RKpt />
        <R4F />
      </div>
    </S.Container>
  );
}

export default WriteBlockList;
