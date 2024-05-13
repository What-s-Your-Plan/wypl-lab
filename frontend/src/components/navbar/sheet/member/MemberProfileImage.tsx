import { useEffect } from 'react';

import { UpdateProfileImageResponse } from '@/@types/Member';
import editIcon from '@/assets/icons/editPaper.svg';
import useImage from '@/hooks/useImage';
import postProfileImage from '@/services/member/postProfileImage';
import useMemberStore from '@/stores/MemberStore';

import * as S from './MemberProfileImage.styled';
import * as MS from './MemberSheet.styled';

function MemberProfileImage() {
  const { profileImage, setProfileImage } = useMemberStore();
  const { value: image, setValue: setImage } = useImage<string>(null);

  const requestUpdateMemberProfileImage = async () => {
    const formData = new FormData();
    formData.append('image', image!);
    const body: UpdateProfileImageResponse = await postProfileImage(formData);
    setProfileImage(body.profile_image_url);
  };

  useEffect(() => {
    if (image !== null) {
      requestUpdateMemberProfileImage();
    }
  }, [image]);

  return (
    <S.Container>
      <S.Wrapper>
        <S.ProfileImage src={profileImage} />
      </S.Wrapper>
      <S.IconWrapper>
        <S.InputImage
          type="file"
          accept="image/png, image/jpg, image/jpeg"
          multiple={false}
          onChange={setImage}
        />
        <MS.Icon src={editIcon} />
      </S.IconWrapper>
    </S.Container>
  );
}

export default MemberProfileImage;
