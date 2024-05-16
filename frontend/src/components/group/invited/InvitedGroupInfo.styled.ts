import styled from 'styled-components';
import tw from 'twin.macro';

const Container = styled.div``;

const Wrapper = styled.div`
  ${tw`
        flex 
        justify-between 
        items-center
        pt-2
        pb-4
        w-full
    `}
`;

const Box = styled.div`
  ${tw`
    flex
    gap-4
    `}
`;

export { Container, Wrapper, Box };
