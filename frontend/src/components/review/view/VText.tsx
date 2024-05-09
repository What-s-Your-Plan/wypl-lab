import { WhiteContainer } from '@/components/common/Container';
import { TextContent } from '@/objects/Content';

type VTextProps = {
  content: TextContent;
};

function VText({ content }: VTextProps) {
  return <WhiteContainer $width="900">{content.text}</WhiteContainer>;
}

export default VText;
