import { PictureContent } from '@/objects/Content';

type TPictureProps = {
  thumbnailContent: PictureContent;
};

function TPicture({ thumbnailContent }: TPictureProps) {
  return (
    <div className="h-full">
      <div className="h-full flex justify-center">
        <img
          src={thumbnailContent.path}
          alt="사진"
          className="object-contain"
        />
      </div>
    </div>
  );
}

export default TPicture;
