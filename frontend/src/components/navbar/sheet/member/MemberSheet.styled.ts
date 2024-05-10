import styled from 'styled-components';
import tw from 'twin.macro';

const Container = styled.div`
  ${tw`
        h-full
        w-full
    `}
`;

const Icon = styled.img`
  ${tw`
    h-4
    w-4

    cursor-pointer
  `}
`;

export { Container, Icon };
