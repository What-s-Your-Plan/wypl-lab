import { WhiteContainer } from '@/components/common/Container';
import { KPTContent } from '@/objects/Content';

type VKptProps = {
  content: KPTContent;
};

function V4F({ content }: VKptProps) {
  return (
    <WhiteContainer $width="900">
      {content.keepStr}
      {content.problemStr}
      {content.tryStr}
    </WhiteContainer>
  );
}

export default V4F;
