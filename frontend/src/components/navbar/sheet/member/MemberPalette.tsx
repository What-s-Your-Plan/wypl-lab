import {
  UpdateLabelColorResponse,
  UpdateLabelColorRequest,
} from '@/@types/Member';

import {
  BgColors,
  LabelColors,
  LabelColorsType,
} from '@/assets/styles/colorThemes';

import ColorCircle from '@/components/common/ColorCircle';
import Text from '@/components/common/Text';

import useLoading from '@/hooks/useLoading';

import patchMemberLabelColor from '@/services/member/patchMemberLabelColor';
import useMemberStore from '@/stores/MemberStore';

import * as S from './MemberPalette.styled';

function MemberPalette() {
  const { mainColor, setLabelColor } = useMemberStore();
  const { isLoading, startLoading, endLoading } = useLoading();

  const changeLabelColor = async (color: BgColors) => {
    if (isLoading() || mainColor === color) {
      return;
    }
    const request: UpdateLabelColorRequest = {
      color,
    };
    startLoading();
    await patchMemberLabelColor(request)
      .then((res: UpdateLabelColorResponse) => {
        setLabelColor(res.color);
      })
      .finally(() => {
        endLoading();
      });
  };

  return (
    <S.Container>
      <S.SelectLabelColorWrapper>
        <Text content={'선택한 색상'} />
        <ColorCircle
          $bgColor={mainColor ? (mainColor as LabelColorsType) : 'labelBrown'}
        />
      </S.SelectLabelColorWrapper>
      <S.SelectLabelColorsWrapper>
        {[...Array(3)].map((_, groupIdx) => (
          <S.SelectLabelColorsBox key={groupIdx}>
            {LabelColors.slice(groupIdx * 6, (groupIdx + 1) * 6).map(
              (value, idx) => (
                <ColorCircle
                  key={idx}
                  onClick={() => changeLabelColor(value)}
                  $bgColor={value}
                  $hover={true}
                  $size={'1.3rem'}
                  $cursor={'pointer'}
                />
              ),
            )}
          </S.SelectLabelColorsBox>
        ))}
        <S.SelectLabelColorsBox>
          {LabelColors.slice(18).map((value, idx) => (
            <ColorCircle key={idx} $bgColor={value} />
          ))}
        </S.SelectLabelColorsBox>
      </S.SelectLabelColorsWrapper>
    </S.Container>
  );
}

export default MemberPalette;
