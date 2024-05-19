import styled from 'styled-components';
import tw from 'twin.macro';
import { BgColors, BgTheme, BorderTheme } from '@/assets/styles/colorThemes';

const Container = styled.div`
  ${tw`
    flex
    flex-col
    gap-2
    my-2
    px-2
    `}
`;

const Wrapper = styled.div`
  ${tw`
  flex 
  items-center
  justify-between
  `}
`;

const Box = styled.div`
  ${tw`
    flex
    flex-row
    gap-4

    items-center
  `}
`;

const ProfileImg = styled.img`
  ${tw`
  w-7
  h-7
  rounded-full
  border
  `}
`;

const Text = styled.span``;

type CheckProps = {
  $color: BgColors;
  $isAccepted: boolean;
};

const Icon = styled.img``;

const Check = styled.div<CheckProps>`
  ${tw`
  text-white
  h-4
  w-4
  rounded-full
  border-dashed
  border-4
  `}

  ${(props) => props.$isAccepted && BgTheme[props.$color]}
  ${(props) => props.$isAccepted && BorderTheme[props.$color]}
`;

export { Container, Wrapper, Box, ProfileImg, Text, Icon, Check };
