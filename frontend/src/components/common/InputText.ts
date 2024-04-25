import tw from 'twin.macro';
import styled from 'styled-components';

const InputDefault = styled.input`
  ${
    tw`
    bg-gray-300
    rounded-md
    h-[32px]
    grow
    px-2
    transition
    focus:outline-main
    `
  }
`

const InputTitle = styled.input`
  ${tw`
      border-b-2
      border-gray-300 // 색상 변경 필요
      h-[32px]
      grow
      px-2
      transition
      font-bold
      placeholder:text-gray-300
      focus:outline-none
      focus:border-main
  `}
`;

export {InputDefault, InputTitle};
