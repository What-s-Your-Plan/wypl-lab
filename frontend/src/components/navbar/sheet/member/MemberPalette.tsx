import ColorCircle from '@/components/common/ColorCircle';

import useLoading from '@/hooks/useLoading';
import patchMemberLabelColor from '@/services/member/patchMemberLabelColor';
import useMemberStore from '@/stores/MemberStore';

import {
  UpdateLabelColorResponse,
  UpdateLabelColorRequest,
} from '@/@types/Member';
import { BgColors, LabelColors } from '@/assets/styles/colorThemes';
import check from '@/assets/icons/check.svg';

import * as S from './MemberPalette.styled';

function MemberPalette() {
  const { mainColor, setMainColor: setLabelColor } = useMemberStore();
  const { canStartLoading, endLoading } = useLoading();

  const changeLabelColor = async (color: BgColors) => {
    if (canStartLoading() || mainColor === color) {
      return;
    }
    const request: UpdateLabelColorRequest = {
      color,
    };
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
      <S.SelectLabelColorsWrapper>
        {[...Array(2)].map((_, boxIdx: number) => (
          <S.SelectLabelColorsBox key={boxIdx}>
            {LabelColors.slice(boxIdx * 7, (boxIdx + 1) * 7).map(
              (value: BgColors, idx: number) => (
                <S.SelectLabelColor key={`${boxIdx}-${idx}-color`}>
                  {mainColor === value && (
                    <S.Icon src={check} className={'whiteImg'} />
                  )}
                  <ColorCircle
                    key={`${boxIdx}-${idx}-circle`}
                    onClick={() => changeLabelColor(value)}
                    $bgColor={value}
                    $hover={true}
                    $cursor={'pointer'}
                  />
                </S.SelectLabelColor>
              ),
            )}
          </S.SelectLabelColorsBox>
        ))}
      </S.SelectLabelColorsWrapper>
    </S.Container>
  );
}

export default MemberPalette;
