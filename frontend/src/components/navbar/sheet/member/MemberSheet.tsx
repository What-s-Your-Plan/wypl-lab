import Button from '@/components/common/Button';
import MemberEmail from './MemberEmail';
import MemberProfileImage from './MemberProfileImage';
import MemberNickname from './MemberNickname';
import MemberPalette from './MemberPalette';

import useJsonWebTokens from '@/hooks/api/useJsonWebTokens';

import * as S from './MemberSheet.styled';

function MemberSheet() {
  const { requestDeleteTokens } = useJsonWebTokens();

  return (
    <S.Container>
      <MemberEmail />
      <MemberProfileImage />
      <MemberNickname />
      <MemberPalette />
      <S.LogoutButtonWrapper>
        <Button
          $size={'sm'}
          $width={'200px'}
          $bgColor={'labelRed'}
          $textColor={'white'}
          onClick={requestDeleteTokens}
        >
          로그아웃
        </Button>
      </S.LogoutButtonWrapper>
    </S.Container>
  );
}

export default MemberSheet;
