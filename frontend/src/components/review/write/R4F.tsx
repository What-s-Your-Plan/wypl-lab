import { WhiteContainer } from '@/components/common/Container';
import { InputTextArea } from '@/components/common/InputText';
import { Divider, DividerY } from '@/components/common/Divider';

function R4F() {
  return (
    <WhiteContainer $width="900" className="flex flex-row gap-5">
      <div className="flex flex-col w-500 gap-2">
        <div>
          <label htmlFor="facts">사실(Facts)</label>
          <InputTextArea
            className="scrollBar"
            $width="100%"
            id="facts"
            rows={6}
            placeholder="일어난 일에 대한 객관적인 기록"
          />
        </div>
        <Divider />
        <div>
          <label htmlFor="feeling">느낌(Feeling)</label>
          <InputTextArea
            className="scrollBar"
            $width="100%"
            id="feeling"
            rows={6}
            placeholder="상황에 대한 감정적인 반응"
          />
        </div>
      </div>
      <DividerY />
      <div className="flex flex-col w-500 gap-2">
        <div>
          <label htmlFor="finding">교훈(Finding)</label>
          <InputTextArea
            className="scrollBar "
            $width="100%"
            id="finding"
            rows={6}
            placeholder="경험을 통해 배울 수 있었던 것"
          />
        </div>
        <Divider />
        <div>
          <label htmlFor="future">향후 행동(Future action)</label>
          <InputTextArea
            className="scrollBar"
            $width="100%"
            id="future"
            rows={6}
            placeholder="향후 할 수 있는 개선된 행동"
          />
        </div>
      </div>
    </WhiteContainer>
  );
}

export default R4F;
