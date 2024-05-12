import MemberEmail from './MemberEmail';
import MemberProfileImage from './MemberProfileImage';
import MemberNickname from './MemberNickname';
import MemberPalette from './MemberPallet';

import * as S from './MemberSheet.styled';

function MemberSheet() {
  return (
    <S.Container>
      <MemberEmail />
      <MemberProfileImage />
      <MemberNickname />
      <MemberPalette />
    </S.Container>
  );
}

export default MemberSheet;
