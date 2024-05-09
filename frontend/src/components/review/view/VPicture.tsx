import { WhiteContainer } from '@/components/common/Container';
import { PictureContent } from '@/objects/Content';

type VPictureProps = {
  content: PictureContent;
};

function VPicture({ content }: VPictureProps) {
  return (
    <WhiteContainer $width="900">
      <img src={content.path} alt="사진" />
    </WhiteContainer>
  );
}

export default VPicture;
