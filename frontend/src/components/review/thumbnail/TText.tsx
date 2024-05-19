import { TextContent } from '@/objects/Content';
import Text from '@/components/common/Text';

type TTextProps = {
  thumbnailContent: TextContent;
};

function TText({ thumbnailContent }: TTextProps) {
  const text =
    thumbnailContent.text.length > 100
      ? thumbnailContent.text.slice(0, 100) + '...'
      : thumbnailContent.text;
  return (
    <div className="w-full h-full">
      <Text content={text} />
    </div>
  );
}

export default TText;
