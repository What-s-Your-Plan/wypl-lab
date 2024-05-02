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
  ${tw`size-8 rounded-full cursor-pointer bg-default-black text-default-white`}
  ${(props) => (props.$sun ? tw`bg-red-600` : '')}
  ${(props) => (props.$satur ? tw`bg-blue-700` : '')}
  ${(props) => (props.$isSelected ? tw`bg-main text-default-black` : '')}
`;

export { TitleDiv, ItemDiv, InputDiv, BetweenDiv, DayButton };
