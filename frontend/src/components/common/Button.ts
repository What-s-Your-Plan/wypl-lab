import tw from 'twin.macro';
import styled from 'styled-components';
import { ButtonSize, ButtonSizeTheme } from '@/assets/styles/sizeThemes';
import {
  BgColors,
  TextColors,
  BorderColors,
  BgTheme,
  TextTheme,
  BorderTheme,
} from '@/assets/styles/colorThemes';

type StyleProps = {
  $size: ButtonSize;
  $width?: string;
  $bgColor?: BgColors;
  $textColor?: TextColors;
  $border?: BorderColors;
};

const Button = styled.button<StyleProps>`
  ${tw`
      flex
      flex-row
      justify-center
      content-center
      items-center
      font-medium
      rounded-xl
      cursor-pointer
      transition
      duration-200
    `}
  ${(props) => ButtonSizeTheme[props.$size]}
  ${(props) => props.$width && `width: ${props.$width};`}
  ${(props) => (props.$bgColor ? BgTheme[props.$bgColor] : BgTheme['white'])}
  ${(props) =>
    props.$textColor ? TextTheme[props.$textColor] : TextTheme['black']}
  ${(props) => (props.$border ? tw`border` : '')}
  ${(props) => (props.$border ? BorderTheme[props.$border] : '')}

  ${(props) => (props.$size !== 'none' ? tw`hover:scale-110 ` : null)}
`;

export default Button;
