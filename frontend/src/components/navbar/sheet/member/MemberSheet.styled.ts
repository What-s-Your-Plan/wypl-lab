import styled from 'styled-components';
import tw from 'twin.macro';

const Container = styled.div`
  ${tw`
      flex
      flex-col
      items-center

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

const LogoutButtonWrapper = styled.div`
  ${tw`
    flex
    justify-center
    
    w-full
    mt-5
  `}
`;

export { Container, Icon, LogoutButtonWrapper };
