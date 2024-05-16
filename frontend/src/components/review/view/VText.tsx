import { WhiteContainer } from '@/components/common/Container';
import { TextContent } from '@/objects/Content';
import Text from '@/components/common/Text';

type VTextProps = {
  content: TextContent;
};

function VText({ content }: VTextProps) {
  return (
    <WhiteContainer $width="900">
      <Text content={content.text} />
    </WhiteContainer>
  );
}

export default VText;
