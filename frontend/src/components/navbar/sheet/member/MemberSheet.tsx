import MemberEmail from './MemberEmail';
import MemberProfileImage from './MemberProfileImage';
import MemberNickname from './MemberNickname';
import MemberPallet from './MemberPallet';

import * as S from './MemberSheet.styled';

function MemberSheet() {
  return (
    <S.Container>
      <MemberEmail />
      <MemberProfileImage />
      <MemberNickname />
      <MemberPallet />
    </S.Container>
  );
}

export default MemberSheet;
