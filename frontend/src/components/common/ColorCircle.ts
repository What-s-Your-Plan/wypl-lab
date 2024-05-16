import tw from 'twin.macro';
import styled from 'styled-components';
import { BgColors, BgTheme } from '@/assets/styles/colorThemes';

type CircleProps = {
  $bgColor: BgColors;
  $size?: string;
  $cursor?: string;
  $hover?: boolean;
};

const ColorCircle = styled.div<CircleProps>`
  ${tw`
    rounded-full
    aspect-square
  `}
  ${(props) => BgTheme[props.$bgColor]}
  ${(props) => (props.$size ? `width: ${props.$size};` : tw`size-6`)}
  ${(props) => (props.$cursor ? `cursor: ${props.$cursor};` : '')}
  ${(props) => (props.$hover ? tw`hover:scale-110` : '')}
`;

export default ColorCircle;
