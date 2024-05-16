import tw from 'twin.macro';
import styled from 'styled-components';
import {
  LabelColorsType,
  BgTheme,
  BgColors,
} from '@/assets/styles/colorThemes';

type DateSpanProps = {
  $isHoliday?: boolean;
  $isSat?: boolean;
  $isSelected: boolean;
};

type ScheduleListProps = {
  $day: number;
  $start: number;
  $length: number;
};

type LScheduleButtonProps = {
  $bgColor: LabelColorsType;
  $startDay: number;
  $row: number;
  $period: number;
};

const DayContainer = styled.div`
  ${tw`w-full grid-cols-7 divide-x bg-default-white divide-gray-100 border-r border-gray-100 text-sm leading-6 text-gray-500 grid`}
`;

const DayWrapper = styled.div`
  ${tw`flex flex-col content-center items-center justify-center pb-3 pt-2`}
`;

const DateSpan = styled.span<DateSpanProps>`
  ${tw`flex size-4 items-center justify-center rounded-full sm:size-8`}
  ${(props) => (props.$isHoliday ? tw`text-label-red` : '')}
  ${(props) => (props.$isSat ? tw`text-label-blue` : '')}
  ${(props) =>
    props.$isSelected
      ? tw`bg-label-brown text-default-white font-semibold`
      : ''}
`;

const ScheduleOl = styled.ol`
  ${tw`
    col-start-1 
    col-end-2 
    row-start-1 
    grid 
    grid-cols-7
  `}
  grid-template-rows: repeat(288, minmax(0, 1fr)) auto;
`;

const ScheduleList = styled.li<ScheduleListProps>`
  ${tw`
    relative 
    mt-px 
    flex 
  `}
  grid-column-start: ${(props) => `${props.$day + 1}`};
  grid-row: ${(props) => `${props.$start} / span ${props.$length}`};
`;

const ScheduleButton = styled.button<{ $bgColor: LabelColorsType }>`
  ${tw`
    absolute 
    p-1
    inset-1 
    flex 
    flex-col 
    overflow-y-auto 
    rounded-lg 
    text-xs 
    text-default-white
    leading-5
    transition-all
  `}
  ${(props) => BgTheme[props.$bgColor as BgColors]}
  &:hover {
    scale: 103%;
    z-index: 10;
  }
`;

const LScheduleContainer = styled.div<{ $height: number }>`
  ${tw`
    row-end-1 
    min-h-8
    outline
    outline-1
    outline-gray-100
    grid 
    relative
    ml-14
    transition-all
    `}
  height: ${(props) => `${props.$height}rem`};
  &:hover {
    scale: 103%;
    z-index: 10;
  }
`;

const LScheduleGrid = styled.div<{ $row: number }>`
  ${tw`
    grid
    grid-cols-7
    bg-none
    absolute
    w-full
  `}
  grid-template-rows: repeat(${(props) => `${props.$row}`}, 1rem);
`;

const LScheduleButton = styled.button<LScheduleButtonProps>`
  ${tw`
    text-default-white
    px-1
    inset-1
    rounded
    truncate
    text-xs
    z-[5]
    border-x
    border-b
    cursor-pointer
  `}
  ${(props) => BgTheme[props.$bgColor]}
  grid-column: ${(props) =>
    `${props.$startDay + 1} / span ${props.$period + 1}`};
  grid-row-start: ${(props) => `${props.$row + 1}`};
`;

export {
  DayContainer,
  DayWrapper,
  DateSpan,
  ScheduleOl,
  ScheduleList,
  ScheduleButton,
  LScheduleContainer,
  LScheduleGrid,
  LScheduleButton,
};
