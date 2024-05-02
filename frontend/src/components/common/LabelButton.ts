import tw from 'twin.macro';
import styled from 'styled-components';
import { LabelColorsType, BgTheme } from '@/assets/styles/colorThemes';

type Props = {
  $bgColor: LabelColorsType;
};

const LabelButton = styled.button<Props>`
  ${tw`rounded-full
    flex
    justify-center
    items-center
    w-fit
    px-3
    py-1
    text-default-white
  `}
  ${(props) => BgTheme[props.$bgColor]}
`;

export default LabelButton;
