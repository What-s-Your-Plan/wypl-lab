import tw from 'twin.macro';
import styled from 'styled-components';
import { LabelColorsType, BgTheme } from '@/assets/styles/colorThemes';

type LabelProps = {
  $bgColor: LabelColorsType;
};

const LabelButton = styled.button<LabelProps>`
  ${tw`rounded-full
    flex
    justify-center
    items-center
    w-fit
    px-3
    py-1
    text-default-white
    font-semibold
  `}
  ${(props) => BgTheme[props.$bgColor]}
`;

export default LabelButton;
