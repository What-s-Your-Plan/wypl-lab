import styled, { keyframes } from 'styled-components';
import tw from 'twin.macro';

import {
  BgColors,
  BgTheme,
  TextColors,
  TextTheme,
} from '@/assets/styles/colorThemes';

const show = keyframes`
  from {
    transform: translateX(100%);
  } to {
    opacity: 1;
    transform: translateX(0px);
  }
`;

type ContainerProps = {
  $bgColor: BgColors;
  $textColor: TextColors;
};

const Container = styled.div<ContainerProps>`
  ${tw`
        fixed

        flex
        items-center
        justify-between
        flex-col

        w-[300px]
        h-[60px]
    `}
  ${(props) => BgTheme[props.$bgColor]}
  ${(props) => TextTheme[props.$textColor]}
  animation: ${show} 600ms ease-in-out;
`;

const ShowWrapper = styled.div`
  ${tw`
    h-1

    w-full
    bg-default-black
    `}
`;

const HeaderWrapper = styled.div`
  ${tw`
        flex
        justify-end
        items-start

        w-full
        h-3
    `}
`;

const Icon = styled.img`
  ${tw` 
        scale-75
        cursor-pointer
    `}
`;

const MessageWrapper = styled.div`
  ${tw`
        flex
        items-center
        w-[90%]
    `}
`;

const Message = styled.span``;

export { Container, ShowWrapper, HeaderWrapper, Icon, MessageWrapper, Message };
