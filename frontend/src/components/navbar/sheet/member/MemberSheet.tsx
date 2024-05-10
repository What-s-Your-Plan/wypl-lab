import MemberEmail from './MemberEmail';
import MemberProfileImage from './MemberProfileImage';
import MemberNickname from './MemberNickname';

import * as S from './MemberSheet.styled';

function MemberSheet() {
  return (
    <S.Container>
      <MemberEmail />
      <MemberProfileImage />
      <MemberNickname />
    </S.Container>
  );
}

export default MemberSheet;
