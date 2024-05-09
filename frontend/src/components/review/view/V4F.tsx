import { FourFContent } from '@/objects/Content';

import { WhiteContainer } from '@/components/common/Container';
import Text from '@/components/common/Text';
import { Divider, DividerY } from '@/components/common/Divider';

type V4FProps = {
  content: FourFContent;
};

function V4F({ content }: V4FProps) {
  return (
    <WhiteContainer $width="900" className="flex justify-around gap-4">
      <div className="w-500 flex flex-col gap-4 justify-between">
        <div>
          <div className="font-semibold">사실(Facts)</div>
          <div className="!min-h-24">
            <Text content={content.facts} />
          </div>
        </div>
        <Divider />
        <div>
          <div className="font-semibold">느낌(Feeling)</div>
          <div className="!min-h-24 !mb-2">
            <Text content={content.feeling} />
          </div>
        </div>
      </div>
      <DividerY />
      <div className="w-500 flex flex-col gap-4 justify-between">
        <div>
          <div className="font-semibold">교훈(Finding)</div>
          <div className="!min-h-24">
            <Text content={content.finding} />
          </div>
        </div>
        <Divider />
        <div>
          <div className="font-semibold">향후 행동(Future action)</div>
          <div className="!min-h-24 !mb-2">
            <Text content={content.future} />
          </div>
        </div>
      </div>
    </WhiteContainer>
  );
}

export default V4F;
