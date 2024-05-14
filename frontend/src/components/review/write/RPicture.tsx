import { PictureContent } from '@/objects/Content';
import { WhiteContainer } from '@/components/common/Container';
import Upload from '@/assets/icons/upload.svg';
import useReviewStore from '@/stores/ReviewStore';
import postPicture from '@/services/review/postPicture';

type RPictureProps = {
  index: number;
  content: PictureContent;
};

function RPicture({ index, content }: RPictureProps) {
  const { setContent } = useReviewStore();

  //TODO: 이미지 업로드 시 파일 validation 체크 필요
  const handleImgChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const formData = new FormData();
      formData.append('image', e.target.files[0]);

      const previewImgUrl = await postPicture(formData);

      const newContent = content;
      newContent.path = previewImgUrl;
      setContent(index, newContent);
    }
  };

  return (
    <WhiteContainer $width="900" className="flex justify-center !py-8">
      <label htmlFor={`file${index}`}>
        <img
          src={content.path === '' ? Upload : content.path}
          className="object-fill h-40"
        />
        <input
          type="file"
          id={`file${index}`}
          name={`file${index}`}
          accept="image/png, image/jpg, image/jpeg"
          multiple={false}
          onChange={handleImgChange}
          className="hidden"
        />
      </label>
    </WhiteContainer>
  );
}

export default RPicture;
