import styled from 'styled-components';
import tw from 'twin.macro';

type Width = keyof typeof containerTheme.width;

interface ContainerProps {
  $width: Width;
}

const Container = styled.div<ContainerProps>`
  ${tw`container p-4 mx-7 shadow-md bg-white/40 rounded-2xl`}
  ${(props) => props.$width && containerTheme.width[props.$width]}
`;

const containerTheme = {
  width: {
    s: tw`w-300 ss:max-sm:w-full h-[90vh]`,
    m: tw`w-800 ml-0 ss:max-sm:w-full ss:max-sm:ml-7 h-[90vh]`,
    f: tw`w-1100 ss:max-sm:w-full h-[90vh]`,
  },
};

export { Container };
