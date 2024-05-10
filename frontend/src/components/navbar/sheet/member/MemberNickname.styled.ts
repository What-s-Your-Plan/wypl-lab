import styled from 'styled-components';
import tw from 'twin.macro';

const Container = styled.div`
  ${tw`
        flex
        justify-center
        items-center
    
        h-16
    `}
`;

const Nickname = styled.p`
  ${tw`
    text-lg
    `}
`;

export { Container, Nickname };
