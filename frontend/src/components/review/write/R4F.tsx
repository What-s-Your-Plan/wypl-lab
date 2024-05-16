import useReviewStore from '@/stores/ReviewStore';

import { FourFContent } from '@/objects/Content';
import { WhiteContainer } from '@/components/common/Container';
import { InputTextArea } from '@/components/common/InputText';
import { Divider, DividerY } from '@/components/common/Divider';

type R4FProps = {
  index: number;
  content: FourFContent;
};

function R4F({ index, content }: R4FProps) {
  const { setContent } = useReviewStore();

  const handleFactsInput = (facts: string) => {
    const newContent = content;
    newContent.facts = facts;
    setContent(index, newContent);
  };

  const handleFeelingInput = (feeling: string) => {
    const newContent = content;
    newContent.feeling = feeling;
    setContent(index, newContent);
  };

  const handleFindingInput = (finding: string) => {
    const newContent = content;
    newContent.finding = finding;
    setContent(index, newContent);
  };

  const handleFutureInput = (future: string) => {
    const newContent = content;
    newContent.future = future;
    setContent(index, newContent);
  };

  return (
    <WhiteContainer $width="900" className="flex flex-row gap-5">
      <div className="flex flex-col w-500 gap-2">
        <div>
          <label htmlFor={`facts${index}`}>사실(Facts)</label>
          <InputTextArea
            className="scrollBar"
            $width="100%"
            id={`facts${index}`}
            rows={6}
            value={content.facts}
            onChange={(e) => handleFactsInput(e.target.value)}
            placeholder="일어난 일에 대한 객관적인 기록"
          />
        </div>
        <Divider />
        <div>
          <label htmlFor={`finding${index}`}>느낌(Feeling)</label>
          <InputTextArea
            className="scrollBar"
            $width="100%"
            id={`feeling${index}`}
            rows={6}
            value={content.feeling}
            onChange={(e) => handleFeelingInput(e.target.value)}
            placeholder="상황에 대한 감정적인 반응"
          />
        </div>
      </div>
      <DividerY />
      <div className="flex flex-col w-500 gap-2">
        <div>
          <label htmlFor={`finding${index}`}>교훈(Finding)</label>
          <InputTextArea
            className="scrollBar "
            $width="100%"
            id={`finding${index}`}
            rows={6}
            value={content.finding}
            onChange={(e) => handleFindingInput(e.target.value)}
            placeholder="경험을 통해 배울 수 있었던 것"
          />
        </div>
        <Divider />
        <div>
          <label htmlFor={`future${index}`}>향후 행동(Future action)</label>
          <InputTextArea
            className="scrollBar"
            $width="100%"
            id={`future${index}`}
            rows={6}
            value={content.future}
            onChange={(e) => handleFutureInput(e.target.value)}
            placeholder="향후 할 수 있는 개선된 행동"
          />
        </div>
      </div>
    </WhiteContainer>
  );
}

export default R4F;
