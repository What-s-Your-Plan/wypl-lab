import { FourFContent } from '@/objects/Content';
import Text from '@/components/common/Text';

type T4FProps = {
  thumbnailContent: FourFContent;
};

function T4F({ thumbnailContent }: T4FProps) {
  return (
    <div>
      <Text content={thumbnailContent.feeling} />
    </div>
  );
}

export default T4F;
