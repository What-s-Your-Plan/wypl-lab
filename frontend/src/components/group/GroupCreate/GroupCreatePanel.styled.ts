import { BgColors, BgTheme, BorderTheme } from '@/assets/styles/colorThemes';
import Lottie from 'lottie-react';
import styled from 'styled-components';
import tw from 'twin.macro';

const CreateGroupForm = styled.form`
  ${tw`
    flex 
    flex-col 
    justify-start

    w-[580px] 
    
    `}
`;

const InputContainer = styled.div`
  ${tw`
    flex
    flex-col
    justify-start
    items-start

    w-full
    pl-1
    `}
`;

const InputWrapper = styled.div`
  ${tw`
    flex
    flex-col

    justify-center
    items-start
    `}
`;

const InputBox = styled.div`
  ${tw`
        flex
        flex-row
        
        items-center
        gap-2
    `}
`;

const InputLabel = styled.label`
  ${tw`
    mb-2
    `}
`;

const MemberWrapper = styled.div`
  ${tw`
    mt-3
    `}
`;

const MemberContainer = styled.div`
  ${tw`
    flex
    items-center

    cursor-pointer
    `}
`;

type MemberProfileWrapperProps = {
  $color: BgColors;
};

const MemberProfileWrapper = styled.div<MemberProfileWrapperProps>`
  ${tw`
    flex
    items-center

    p-2
    border
    rounded-[10px]

    w-[22vw]
    shadow-md
  `}

  ${(props) => BorderTheme[props.$color]}
  &:hover {
    background-color: ${(props) => BgTheme[props.$color]};
    color: white;
  }
`;

const SelectMemberProfileWrapper = styled.div<MemberProfileWrapperProps>`
  ${tw`
    flex
    items-center

    p-2
    border
    rounded-[10px]

    w-[22vw]
    shadow-md
  `}

  ${(props) => BorderTheme[props.$color]}
  &:hover {
    background-color: ${(props) => BgTheme[props.$color]};
    color: white;
  }
`;

const MemberProfileBox = styled.div`
  ${tw`
        pl-4
    `}
`;

const MemberProfileImg = styled.img`
  ${tw`
    w-9
    h-9
    rounded-full
    `}
`;

const MemberProfileSpan = styled.span`
  ${tw`
        flex
        flex-col
    `}
`;

type BarProps = {
  $color: BgColors;
};

const Bar = styled.div<BarProps>`
  ${tw`
      h-[0.5px]
      w-full

      mt-5
      mb-3
    `}
  ${(props) => BgTheme[props.$color]}
`;

const AnimationBox = styled.div`
  ${tw`
    flex
    justify-center
    items-center
  `}
`;

const Animation = styled(Lottie)`
  ${tw`
    h-[200px]
  `}
`;

export {
  CreateGroupForm,
  InputContainer,
  InputWrapper,
  InputBox,
  InputLabel,
  MemberContainer,
  MemberWrapper,
  SelectMemberProfileWrapper,
  MemberProfileWrapper,
  MemberProfileBox,
  MemberProfileImg,
  MemberProfileSpan,
  Bar,
  AnimationBox,
  Animation,
};
