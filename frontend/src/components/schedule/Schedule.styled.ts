import tw from 'twin.macro';
import styled from 'styled-components';

const TitleDiv = styled.div`
  ${tw`flex justify-center gap-3 items-start p-3`}
`;

const ItemDiv = styled.div`
  ${tw`flex flex-row justify-center gap-3 items-start p-6`}
`;

const InputDiv = styled.div`
  ${tw`flex flex-col justify-center grow items-center gap-3`}
`;

const BetweenDiv = styled.div`
  ${tw`flex flex-row gap-3 w-full justify-between`}
`;

const DayButton = styled.button<{
  $isSelected: boolean;
  $sun?: boolean;
  $satur?: boolean;
}>`
  ${tw`size-8 rounded-full cursor-pointer border-2 border-gray-400 text-gray-400 font-bold transition-all`}
  ${(props) => {
    if (props.$isSelected) {
      if (props.$sun) {
        return tw`border-red-500 text-red-500`;
      } else if (props.$satur) {
        return tw`border-blue-600 text-blue-600`;
      }
      return tw`border-default-black text-default-black`;
    }
    return '';
  }}
`;

const TimeContainer = tw.div`
  flex
  flex-row
  gap-x-1
`;

export { TitleDiv, ItemDiv, InputDiv, BetweenDiv, DayButton, TimeContainer };
