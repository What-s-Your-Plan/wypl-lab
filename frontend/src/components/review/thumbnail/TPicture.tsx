import { PictureContent } from '@/objects/Content';

type TPictureProps = {
  thumbnailContent: PictureContent;
};

function VPicture({ thumbnailContent }: TPictureProps) {
  return (
    <div className="flex justify-center">
      <img src={thumbnailContent.path} alt="사진" className="" />
    </div>
  );
}

export default VPicture;
