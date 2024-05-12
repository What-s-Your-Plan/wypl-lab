import { PictureContent } from '@/objects/Content';

type TPictureProps = {
  thumbnailContent: PictureContent;
};

function TPicture({ thumbnailContent }: TPictureProps) {
  return (
    <div className="flex justify-center">
      <img src={thumbnailContent.path} alt="사진" />
    </div>
  );
}

export default TPicture;
