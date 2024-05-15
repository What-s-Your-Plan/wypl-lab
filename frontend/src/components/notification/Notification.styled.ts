import styled from 'styled-components';
import tw from 'twin.macro';

const Container = styled.div`
  ${tw`
    fixed
    
    flex
    flex-col
    justify-end

    w-[300px]

    right-10
    bottom-10
  `}
`;

export { Container };
