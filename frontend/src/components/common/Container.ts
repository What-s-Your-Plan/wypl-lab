import styled from 'styled-components';
import tw from 'twin.macro';

type Width = keyof typeof containerTheme.width;
type Height = keyof typeof containerTheme.height;

interface ContainerProps {
  $width: Width;
}

interface WhiteContainerProps {
  $width: Width;
  $height?: Height;
}

const Container = styled.div<ContainerProps>`
  ${tw`container p-4 mx-7 shadow-md bg-default-white/40 rounded-2xl`}
  ${(props) => props.$width && containerTheme.width[props.$width]}
`;

const WhiteContainer = styled.div<WhiteContainerProps>`
  ${tw`container p-3 mb-4 shadow-md rounded-xl bg-default-white`}
  ${(props) => props.$width && containerTheme.width[props.$width]}
  ${(props) => (props.$height ? containerTheme.height[props.$height] : '')}
`;

const containerTheme = {
  width: {
    '300': tw`w-300 ss:max-sm:w-full h-[90vh]`,
    '400': tw`w-400`,
    '500': tw`w-500`,
    '800': tw`w-800 ml-0 ss:max-sm:w-full ss:max-sm:ml-7 h-[90vh]`,
    '900': tw`w-900`,
    '1100': tw`w-1100 ss:max-sm:w-full h-[90vh]`,
    '1200': tw`w-1200`,
    '1300': tw`w-1300`,
    left: tw`w-[24%] ss:max-sm:w-full h-[90vh]`,
    right: tw`w-[70%] ml-0 ss:max-sm:w-full ss:max-sm:ml-7 h-[90vh]`,
  },
  height: {
    quarter: tw`h-[10vh]`,
    third: tw`h-[15vh]`,
    half: tw`h-[20vh]`,
    twoThird: tw`h-[25vh]`,
    one: tw`h-[40vh]`,
    max: tw`h-[85vh]`,
  },
};

export { Container, WhiteContainer };
