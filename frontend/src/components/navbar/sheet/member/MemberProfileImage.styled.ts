import styled from 'styled-components';
import tw from 'twin.macro';

const Container = styled.div`
  ${tw`
        flex
        justify-center
        items-center

        w-full
        h-32
    `}
`;

const Wrapper = styled.div`
  ${tw`
        flex
        justify-center
        items-center

        w-24
        h-24

        rounded-full

        shadow-md
    `}
`;

const ProfileImage = styled.img`
  ${tw`
        w-16
        h-16
    `}
`;

const IconWrapper = styled.div`
  ${tw`
      fixed

      flex
      justify-center
      items-center

      w-8
      h-8
      bg-default-white
      rounded-full

      left-[280px]
      bottom-[250px]

      shadow-md
  `}
`;

export { Container, Wrapper, ProfileImage, IconWrapper };
