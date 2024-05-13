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
      <S.SelectLabelColorsWrapper>
        {[...Array(2)].map((_, groupIdx) => (
          <S.SelectLabelColorsBox key={groupIdx}>
            {LabelColors.slice(groupIdx * 7, (groupIdx + 1) * 7).map(
              (value, idx) => (
                <S.SelectLabelColor>
                  {mainColor === value && <S.Icon src={check} />}
                  <ColorCircle
                    key={idx}
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

{
  /* <ColorCircle
                  key={idx}
                  onClick={() => changeLabelColor(value)}
                  $bgColor={value}
                  $hover={true}
                  $size={'1.3rem'}
                  $cursor={'pointer'}
                /> */
}
