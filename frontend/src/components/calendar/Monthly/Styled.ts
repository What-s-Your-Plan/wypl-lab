import tw from 'twin.macro';
import styled from 'styled-components';
import { LabelColorsType, BgTheme } from '@/assets/styles/colorThemes';

const DateContainer = styled.div`
  ${tw`flex flex-col border-t-2 border-t-main relative`}
`;

const ScheduleSpan = styled.span<{ $color: LabelColorsType, $top: number, $width: number }>`
  ${tw`flex p-1 absolute left-0 justify-center items-center z-[5] text-xs h-4 text-default-white`}
  ${(props) => BgTheme[props.$color]}
  ${(props) => `top: ${props.$top}rem;`}
  ${(props) => `width: ${props.$width}00%;`}
`;

const DateSpan = styled.span<{ $isCurrentMonth: boolean; $day: number }>`
  ${(props) => {
    if (props.$day === 0) {
      return tw`text-label-red`;
    } else if (props.$day) {
      return tw`text-label-blue`;
    }
    return '';
  }}
  ${(props) =>
    props.$isCurrentMonth ? tw`text-default-black` : tw`text-gray-400`}
`;

const NoSchedule = styled.div<{$top: number}>`
  ${tw`invisible h-4 absolute`}
  ${(props) => `top: ${props.$top}rem;`}
`

export { DateContainer, ScheduleSpan, DateSpan, NoSchedule };
