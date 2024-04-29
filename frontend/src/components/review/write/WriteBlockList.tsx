import * as S from '@/components/common/Container';
import RTitle from './RTitle';
import Divider from '@/components/common/Divider';
import RSchedule from './RSchedule';
import RText from './RText';
import RWeather from './REmotion';
import RPicture from './RPicture';

function WriteBlockList() {
  return (
    <S.Container $width="800" className="scrollBar flex flex-col gap-4">
      <div>
        <RTitle />
        <RSchedule />
      </div>
      <Divider />
      <div>
        <RText />
        <RWeather />
        <RPicture />
      </div>
    </S.Container>
  );
}

export default WriteBlockList;
