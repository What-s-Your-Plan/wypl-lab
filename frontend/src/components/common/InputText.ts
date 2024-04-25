import tw from 'twin.macro';
import styled from 'styled-components';

type Props = {
  $width?: string;
  $isValid?: boolean;
};

const InputDefault = styled.input<Props>`
  ${tw`
    rounded-md
    h-[32px]
    px-2
    transition
    focus:outline-main
    `}
  ${(props) => (props.$isValid === false ? tw`bg-label-pink` : tw`bg-gray-300`)}
  ${(props) => (props.$width ? `width:${props.$width};` : tw`grow`)}
`;

const InputTitle = styled.input<Props>`
  ${tw`
      border-b-2
      border-gray-300 // 색상 변경 필요
      font-bold
      h-[32px]
      px-2
      transition
      placeholder:text-gray-300
      focus:outline-none
      focus:border-main
  `}
  ${(props) =>
    props.$isValid === false ? tw`bg-label-pink` : tw`bg-transparent`}
  ${(props) => (props.$width ? `width:${props.$width};` : tw`grow`)}
`;

export { InputDefault, InputTitle };
