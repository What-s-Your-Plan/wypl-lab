import { BgColors, BgTheme } from '@/assets/styles/colorThemes';
import styled from 'styled-components';
import tw from 'twin.macro';

const TitleContainer = styled.div``;

const Title = styled.p`
  ${tw`
      mb-4
  `}
`;

type BarProps = {
  $color: BgColors;
};

const Bar = styled.div<BarProps>`
  ${tw`
    h-[0.5px]
    mb-5
  `}
  ${(props) => BgTheme[props.$color]}
`;

export { TitleContainer, Title, Bar };
