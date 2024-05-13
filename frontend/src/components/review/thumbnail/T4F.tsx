import { FourFContent } from '@/objects/Content';
import Text from '@/components/common/Text';

type T4FProps = {
  thumbnailContent: FourFContent;
};

function T4F({ thumbnailContent }: T4FProps) {
  const facts =
    thumbnailContent.facts.length > 100
      ? thumbnailContent.facts.slice(0, 100) + '...'
      : thumbnailContent.facts;
  return (
    <div>
      <div className="font-semibold">사실(Facts)</div>
      <Text content={facts} />
    </div>
  );
}

export default T4F;
