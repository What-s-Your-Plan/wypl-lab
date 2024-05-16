import tw from 'twin.macro';
import styled from 'styled-components';

const DateWrapper = styled.div<{ $idx: number }>`
  ${tw`py-1`}
  ${(props) => props.$idx > 6 && tw`border-t border-gray-200`}
`;

type DButtonProps = {
  $isSelected: boolean;
  $isToday: boolean;
  $isCurrentMonth: boolean;
};

const DateButton = styled.button<DButtonProps>`
  ${tw`
    cursor-pointer
    rounded-full
    mx-auto
    flex
    size-5
    items-center
    justify-center
    text-xs
  `}
  ${(props) => props.$isSelected && tw`text-default-white`}
  ${(props) => !props.$isSelected && props.$isToday && tw`text-indigo-600 border border-indigo-600`}
  ${(props) =>
    !props.$isSelected &&
    props.$isToday &&
    !props.$isCurrentMonth &&
    tw`text-indigo-400`}
  ${(props) =>
    !props.$isSelected &&
    !props.$isToday &&
    props.$isCurrentMonth &&
    tw`text-default-black`}
  ${(props) =>
    !props.$isSelected &&
    !props.$isToday &&
    !props.$isCurrentMonth &&
    tw`text-gray-400`}
  ${(props) => props.$isSelected && tw`bg-label-brown`}
  ${(props) => !props.$isSelected && tw`hover:bg-gray-200`}
  ${(props) => (!props.$isSelected || props.$isToday) && tw`font-semibold`}
`;

const Chevrons = styled.img`
  filter: invert(30%) sepia(8%) saturate(1109%) hue-rotate(176deg)
    brightness(96%) contrast(83%);
  &:hover {
    filter: none;
  }
`;

export { DateWrapper, DateButton, Chevrons };
