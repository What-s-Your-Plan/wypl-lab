import { WhiteContainer } from '@/components/common/Container';
import { PictureContent } from '@/objects/Content';

type VTextProps = {
  content: PictureContent;
};

function VText({ content }: VTextProps) {
  return (
    <WhiteContainer $width="900">
      <img src={content.path} alt="사진" />
    </WhiteContainer>
  );
}

export default VText;
