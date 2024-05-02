import tw from 'twin.macro';
import styled from 'styled-components';

type Props = {
  $width?: string;
  $isValid?: boolean;
  $void?: boolean;
  $resize?: boolean;
};

const InputDefault = styled.input<Props>`
  ${tw`
    h-8
    rounded-md
    px-2
    transition

    placeholder:text-gray-300
    hover:outline-gray-400
    focus:!outline-none
    focus:ring
    focus:ring-main
    `}
  ${(props) => (props.$void ? '' : tw`outline outline-1`)}
  ${(props) =>
    props.$isValid === false
      ? tw`outline-label-red text-label-red`
      : tw`outline-gray-300`}
  ${(props) => (props.$width ? `width:${props.$width};` : tw`grow`)}
`;

const InputTitle = styled.input<Props>`
  ${tw`
      h-8
      bg-transparent
      font-bold
      px-2
      transition

      placeholder:text-gray-300
      hover:border-gray-400
      focus:!outline-none
      focus:border-main
  `}
  ${(props) => (props.$void ? '' : tw`border-b-2`)}
  ${(props) =>
    props.$isValid === false
      ? tw`border-label-red text-label-red`
      : tw`border-gray-300`}
  ${(props) => (props.$width ? `width:${props.$width};` : tw`grow`)}
`;

const InputTextArea = styled.textarea<Props>`
  ${tw`
    rounded-md
    px-2
    transition

    placeholder:text-gray-300
    hover:outline-gray-400
    focus:!outline-none
    focus:ring
    focus:ring-main
    `}
  ${(props) => (props.$void ? '' : tw`outline outline-1`)}
  ${(props) =>
    props.$isValid === false
      ? tw`outline-label-red text-label-red`
      : tw`outline-gray-300`}
  ${(props) => (props.$width ? `width:${props.$width};` : tw`grow`)}
  ${(props) => (props.$resize === false ? tw`resize-none` : '')}
`;

export { InputDefault, InputTitle, InputTextArea };
