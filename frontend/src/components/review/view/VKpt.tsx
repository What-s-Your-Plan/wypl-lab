import { KPTContent } from '@/objects/Content';
import { WhiteContainer } from '@/components/common/Container';
import Text from '@/components/common/Text';
import { Divider, DividerY } from '@/components/common/Divider';

type VKptProps = {
  content: KPTContent;
};

function V4F({ content }: VKptProps) {
  return (
    <WhiteContainer $width="900" className="flex justify-between gap-4">
      <div className="w-500 flex flex-col gap-4 justify-between">
        <div>
          <div className="font-semibold">Keep</div>
          <div className="!min-h-24">
            <Text content={content.keepStr} />
          </div>
        </div>
        <Divider />
        <div>
          <div className="font-semibold">Problem</div>
          <div className="!min-h-24 !mb-2">
            <Text content={content.problemStr} />
          </div>
        </div>
      </div>
      <DividerY />
      <div className="w-500">
        <div className="font-semibold">Try</div>
        <div className="!min-h-[236px] !mb-2">
          <Text content={content.tryStr} />
        </div>
      </div>
    </WhiteContainer>
  );
}

export default V4F;
