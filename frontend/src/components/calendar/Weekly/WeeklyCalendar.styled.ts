import tw from 'twin.macro';
import styled from 'styled-components';

const DaySticky = styled.div`
  ${tw`sticky top-0 z-30 flex-none bg-default-white shadow ring-1 ring-black ring-opacity-5`}
`;

const DayContainer = styled.div`
  ${tw`-mr-px w-full grid-cols-7 divide-x divide-gray-100 border-r border-gray-100 text-sm leading-6 text-gray-500 grid`}
`;

const DayWrapper = styled.div`
  ${tw`flex flex-col content-center items-center justify-center pb-3 pt-2`}
`;

const DateSpan = styled.span<{
  $isHoliday?: boolean;
  $isSat?: boolean;
  $isSelected: boolean;
}>`
  ${tw` flex size-4 items-center justify-center rounded-full sm:size-8`}
  ${(props) => (props.$isHoliday ? tw`text-label-red` : '')}
  ${(props) => (props.$isSat ? tw`text-label-blue` : '')}
  ${(props) =>
    props.$isSelected
      ? tw`bg-label-brown text-default-white font-semibold`
      : ''}
`;

export { DaySticky, DayContainer, DayWrapper, DateSpan };
