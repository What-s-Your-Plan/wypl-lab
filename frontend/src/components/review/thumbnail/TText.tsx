import { TextContent } from '@/objects/Content';
import Text from '@/components/common/Text';

type TTextProps = {
  thumbnailContent: TextContent;
};

function TText({ thumbnailContent }: TTextProps) {
  return (
    <div>
      <Text content={thumbnailContent.text} />
    </div>
  );
}

export default TText;
