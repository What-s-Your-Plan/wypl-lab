import { WhiteContainer } from '@/components/common/Container';
import { useRef, useState } from 'react';
import Upload from '@/assets/icons/upload.svg';

function RPicture() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [previewImg, setPreviewImg] = useState<string>(Upload);

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
          setPreviewImg(previewImgUrl);
        }
      };
    }
  };

  const handleUploadClick = () => {};

  return (
    <WhiteContainer $width="900" className="flex justify-center">
      <label htmlFor="file">
        <img src={previewImg} className="w-40 h-40" />
        <input
          type="file"
          id="file"
          accept="image/png, image/jpg, image/jpeg"
          multiple={false}
          onClick={handleUploadClick}
          onChange={handleImgChange}
          ref={inputRef}
          className="hidden"
        />
      </label>
    </WhiteContainer>
  );
}

export default RPicture;
