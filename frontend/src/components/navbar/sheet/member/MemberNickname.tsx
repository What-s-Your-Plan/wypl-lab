import useMemberStore from '@/stores/MemberStore';

import * as S from './MemberNickname.styled';

function MemberNickname() {
  const { nickname } = useMemberStore();

  return (
    <S.Container>
      <S.Nickname>안녕하세요, {nickname}님</S.Nickname>
    </S.Container>
  );
}

export default MemberNickname;
