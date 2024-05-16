import tw from 'twin.macro';
import styled from 'styled-components';

const IndexButton = styled.button<{ $isActive: boolean }>`
  writing-mode: vertical-rl;
  ${tw`
    flex 
    h-20
    justify-center 
    border-t
    border-r
    border-b
    border-label-brown 
    items-end 
    font-bold text-lg
    rounded-r-xl 
    cursor-pointer
    transition-all
    hover:w-12
  `}
  ${(props) => (props.$isActive ? tw`w-12` : tw`w-9`)}
  ${(props) => (props.$isActive ? tw`bg-default-white` : tw`bg-label-brown`)}
  ${(props) =>
    props.$isActive ? tw`text-label-brown` : tw`text-default-white`}
`;

export default IndexButton;
