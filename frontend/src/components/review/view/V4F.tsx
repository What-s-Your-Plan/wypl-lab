import { WhiteContainer } from '@/components/common/Container';
import { FourFContent } from '@/objects/Content';

type V4FProps = {
  content: FourFContent;
};

function V4F({ content }: V4FProps) {
  return (
    <WhiteContainer $width="900">
      {content.facts}
      {content.feeling}
      {content.finding}
      {content.future}
    </WhiteContainer>
  );
}

export default V4F;
