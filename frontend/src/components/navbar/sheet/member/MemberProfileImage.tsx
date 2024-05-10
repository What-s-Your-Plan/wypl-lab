import editIcon from '@/assets/icons/editPaper.svg';
import useMemberStore from '@/stores/MemberStore';

import * as S from './MemberProfileImage.styled';
import * as MS from './MemberSheet.styled';

function MemberProfileImage() {
  const { profileImage } = useMemberStore();

  return (
    <S.Container>
      <S.Wrapper>
        <S.ProfileImage src={profileImage} />
      </S.Wrapper>
      <S.IconWrapper>
        <MS.Icon src={editIcon} />
      </S.IconWrapper>
    </S.Container>
  );
}

export default MemberProfileImage;
