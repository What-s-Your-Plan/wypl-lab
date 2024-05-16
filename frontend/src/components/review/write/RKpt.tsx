import useReviewStore from '@/stores/ReviewStore';

import { KPTContent } from '@/objects/Content';
import { WhiteContainer } from '@/components/common/Container';
import { InputTextArea } from '@/components/common/InputText';
import { Divider, DividerY } from '@/components/common/Divider';

type RKptProps = {
  index: number;
  content: KPTContent;
};

function RKpt({ index, content }: RKptProps) {
  const { setContent } = useReviewStore();

  const handleKeepInput = (keepStr: string) => {
    const newContent = content;
    newContent.keepStr = keepStr;
    setContent(index, newContent);
  };

  const handleProblemInput = (problemStr: string) => {
    const newContent = content;
    newContent.problemStr = problemStr;
    setContent(index, newContent);
  };

  const handleTryInput = (tryStr: string) => {
    const newContent = content;
    newContent.tryStr = tryStr;
    setContent(index, newContent);
  };

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
            value={content.keepStr}
            onChange={(e) => handleKeepInput(e.target.value)}
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
            value={content.problemStr}
            onChange={(e) => handleProblemInput(e.target.value)}
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
            value={content.tryStr}
            onChange={(e) => handleTryInput(e.target.value)}
            placeholder="Problem에 대한 해결책/당장 실행가능한 부분"
          />
        </div>
      </div>
    </WhiteContainer>
  );
}

export default RKpt;
