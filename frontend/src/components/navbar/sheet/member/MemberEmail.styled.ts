import styled from 'styled-components';
import tw from 'twin.macro';

const Container = styled.div`
  ${tw`
        flex
        justify-center
        items-center

        h-12
    `}
`;

const Email = styled.p`
  ${tw`
        text-base
    `}
`;

export { Container, Email };
