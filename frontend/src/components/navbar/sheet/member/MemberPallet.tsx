import { useEffect } from 'react';

import Text from '@/components/common/Text';
import useMemberStore from '@/stores/MemberStore';
import getMemberColor from '@/services/member/getLabelColor';

import * as S from './MemberPallet.styled';

function MemberPallet() {
  const { mainColor: labelColor, setLabelColor } = useMemberStore();

  const requestFindMemberColor = async () => {
    const response: FindMemberColorResponse = await getMemberColor();
    setLabelColor(response.select_color);
  };

  useEffect(() => {
    if (labelColor === undefined) {
      requestFindMemberColor();
    }
  }, []);

  return (
    <S.Container>
      <S.SelectLabelColorWrapper>
        <Text content={'선택 라벨 색상'} />
        <S.LabelColor className={`bg-label-brown`} />
      </S.SelectLabelColorWrapper>
    </S.Container>
  );
}

export default MemberPallet;
