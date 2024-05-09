import styled from 'styled-components';
import tw from 'twin.macro';

const Container = styled.div`
  ${tw`
    my-[30px]
    flex
    flex-col

    items-center
    justify-between

    h-full
  `}
`;

const Wrapper = styled.div``;

export { Container, Wrapper };
