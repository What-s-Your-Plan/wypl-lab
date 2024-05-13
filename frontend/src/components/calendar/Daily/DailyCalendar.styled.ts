import tw from 'twin.macro';
import styled from 'styled-components';
import { BgTheme, LabelColorsType } from '@/assets/styles/colorThemes';

const VerticalLine = styled.span`
  ${tw`
    // absolute 
    // left-5 
    // top-5 
    // -ml-px 
    border-t
    border-b
    h-10
    w-1 
    bg-main
  `}
`;

const ScheduleContainer = styled.div`
  ${tw`
    flex
    gap-4
    content-center
  `}
`;

const LabelDiv = styled.div<{ $bgColor: LabelColorsType }>`
  ${tw`
    rounded-xl
    w-8
  `}
  ${(props) =>
    props.$bgColor ? BgTheme[props.$bgColor] : BgTheme['labelBrown']}
`;

const ScheduleContents = styled.div`
  ${tw`
    flex
    flex-col
  `}
`;

export { VerticalLine, LabelDiv, ScheduleContainer, ScheduleContents };
