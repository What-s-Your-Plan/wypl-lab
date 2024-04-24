import tw from 'twin.macro';
import styled from 'styled-components';
import {
  ButtonSizeTheme,
  BgTheme,
  TextTheme,
  ButtonSize,
  Colors,
} from '@/assets/styles/themes';

type StyleProps = {
  $size: ButtonSize;
  $width?: string;
  $bgColor?: Colors;
  $textColor?: Colors;
};

const Button = styled.button<StyleProps>`
  ${tw`
      flex
      flex-row
      justify-center
      content-center
      items-center
      rounded-lg
    `}
  ${(props) => ButtonSizeTheme[props.$size]}
  ${(props) => props.$width && `width: ${props.$width};`}
  ${(props) => (props.$bgColor ? BgTheme[props.$bgColor] : BgTheme['white'])}
  ${(props) =>
    props.$textColor ? TextTheme[props.$textColor] : TextTheme['black']}
`;

export default Button;
