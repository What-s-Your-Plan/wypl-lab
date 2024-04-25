import * as S from '@/components/common/Container';
import RTitle from './RTitle';
import Divider from '@/components/common/Divider';
import RSchedule from './RSchedule';

function WriteBlockList() {
  return (
    <S.Container $width="800" className="scrollBar">
      <div>
        <RTitle />
        <RSchedule />
      </div>
      <Divider />
    </S.Container>
  );
}

export default WriteBlockList;
