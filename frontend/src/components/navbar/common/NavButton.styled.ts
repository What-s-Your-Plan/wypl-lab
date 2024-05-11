import styled from 'styled-components';
import tw from 'twin.macro';

const Container = styled.div``;

const Button = styled.button`
  ${tw`
      flex
      items-center
      justify-center

      mt-5
      w-12
      h-12

      rounded-full

      hover:bg-default-warmgray
      hover:duration-100
    `}
`;

const Image = styled.img`
  ${tw`
    h-7
    w-7

    rounded-full
`}
`;

export { Container, Button, Image };
