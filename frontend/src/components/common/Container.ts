import styled from 'styled-components';
import tw from 'twin.macro';

type Size = keyof typeof containerTheme.size;

interface ContainerProps {
  $size: Size;
}

const Container = styled.div<ContainerProps>`
  ${tw`container mx-auto p-8`}
  ${(props) => props.$size && containerTheme.size[props.$size]}
`;

const containerTheme = {
  size: {
    sm: 'w-1/5',
    md: 'w-3/5',
    full: 'w-full',
  },
};

export { Container };
