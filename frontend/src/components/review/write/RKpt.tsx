import { WhiteContainer } from '@/components/common/Container';
import { InputTextArea } from '@/components/common/InputText';
import { Divider, DividerY } from '@/components/common/Divider';

function RText() {
  return (
    <WhiteContainer $width="900" className="flex flex-row gap-5">
      <div className="flex flex-col w-500 gap-2">
        <div>
          <label htmlFor="keep">Keep</label>
          <InputTextArea
            className="scrollBar"
            $width="100%"
            id="keep"
            rows={6}
            placeholder="현재 만족하고 있는 부분/계속 이어갔으면 하는 부분"
          />
        </div>
        <Divider />
        <div>
          <label htmlFor="problem">Problem</label>
          <InputTextArea
            className="scrollBar"
            $width="100%"
            id="problem"
            rows={5}
            placeholder="불편하게 느끼는 부분/개선이 필요하다고 생각되는 부분"
          />
        </div>
      </div>
      <DividerY />
      <div className="w-500">
        <div>
          <label htmlFor="problem">Try</label>
          <InputTextArea
            className="scrollBar "
            $width="100%"
            id="problem"
            rows={13}
            placeholder="Problem에 대한 해결책/당장 실행가능한 부분"
          />
        </div>
      </div>
    </WhiteContainer>
  );
}

export default RText;
