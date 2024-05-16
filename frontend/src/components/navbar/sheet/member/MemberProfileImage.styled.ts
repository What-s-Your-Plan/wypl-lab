import styled from 'styled-components';
import tw from 'twin.macro';

const Container = styled.div`
  ${tw`
        flex
        justify-center
        items-center

        w-full
        h-24
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
        w-24
        h-24
        object-cover
        rounded-full
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
      bottom-[270px]

      shadow-md
      cursor-pointer
  `}
`;

const InputImage = styled.input`
  ${tw`
    fixed

    h-8
    w-8
    
    rounded-full
    opacity-0
    cursor-pointer
  `};
`;

export { Container, Wrapper, ProfileImage, IconWrapper, InputImage };
