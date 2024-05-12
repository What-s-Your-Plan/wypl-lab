import { KPTContent } from '@/objects/Content';
import Text from '@/components/common/Text';

type TKptProps = {
  thumbnailContent: KPTContent;
};

function TKpt({ thumbnailContent }: TKptProps) {
  return (
    <div>
      <Text content={thumbnailContent.keepStr} />
    </div>
  );
}

export default TKpt;
