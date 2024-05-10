import styled from 'styled-components';
import tw from 'twin.macro';

const Container = styled.div``;

const Sheet = styled.div`
  ${tw`
    fixed

    flex
    justify-center
    items-center
    flex-col

    z-10
    w-[320px]
    h-[400px]
    rounded-[16px]
    
    ml-24
    mb-4
    bottom-0

    bg-default-white
    shadow-md
    `}
`;

const CloseButton = styled.button`
  // FIXME: ??.. 이거 수정할 수 있을까?..
  ${tw`
    fixed

    flex
    justify-center
    items-center

    mb-[350px]
    ml-[270px]

    w-8
    h-8
    rounded-full

    hover:bg-default-warmgray
    hover:duration-100
  `}
`;

const CloseIcon = styled.img`
  ${tw`
  w-6
  h-6
  `}
`;

const OuterArea = styled.div`
  ${tw`
    fixed
    z-10
    ml-20

    w-full
    h-full
    `}
`;

export { Container, Sheet, CloseButton, CloseIcon, OuterArea };
