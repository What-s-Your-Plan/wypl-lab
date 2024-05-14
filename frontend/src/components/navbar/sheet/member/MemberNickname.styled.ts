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

const NicknameUpdateWrapper = styled.div`
  ${tw`
    flex
    flex-row
    
    items-end
  `}
`;

const NicknameUpdateBox = styled.span`
  ${tw`
    underline
    cursor-pointer
  `}
`;

const IconWrapper = styled.div`
  ${tw`
    flex
  `}
`;

const IconBox = styled.div`
  ${tw`
      flex
      items-center
      justify-center

      ml-2
      w-8
      h-8

      rounded-full

      hover:bg-default-warmgray
      hover:duration-100
    `}
`;

const Icon = styled.img`
  ${tw`
    cursor-pointer
  `}
`;

export {
  Container,
  Nickname,
  NicknameUpdateWrapper,
  NicknameUpdateBox,
  IconWrapper,
  IconBox,
  Icon,
};
