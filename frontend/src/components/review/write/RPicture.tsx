import { useRef } from 'react';

import { PictureContent } from '@/objects/Content';
import { WhiteContainer } from '@/components/common/Container';
import Upload from '@/assets/icons/upload.svg';
import useReviewStore from '@/stores/ReviewStore';

type RPictureProps = {
  index: number;
  content: PictureContent;
};

function RPicture({ index, content }: RPictureProps) {
  const { setContent } = useReviewStore();

  const inputRef = useRef<HTMLInputElement>(null);

  //TODO: 이미지 업로드 시 파일 validation 체크 필요
  const handleImgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      let reader = new FileReader();

      if (e.target.files[0]) {
        reader.readAsDataURL(e.target.files[0]);
      }

      reader.onloadend = () => {
        const previewImgUrl = reader.result;

        if (typeof previewImgUrl === 'string') {
          const newContent = content;
          newContent.path = previewImgUrl;
          setContent(index, newContent);
        }
      };
    }
  };

  return (
    <WhiteContainer $width="900" className="flex justify-center">
      <label htmlFor="file">
        <img
          src={content.path === '' ? Upload : content.path}
          className="w-40 h-40"
        />
        <input
          type="file"
          id="file"
          accept="image/png, image/jpg, image/jpeg"
          multiple={false}
          onChange={handleImgChange}
          ref={inputRef}
          className="hidden"
        />
      </label>
    </WhiteContainer>
  );
}

export default RPicture;
