import styled from 'styled-components';
import tw from 'twin.macro';

const Container = styled.div`
  ${tw`
        flex
        justify-center
        items-center
    
        h-16
    `}
`;

const Nickname = styled.p`
  ${tw`
    text-lg
    `}
`;

const NicknameUpdateWrapper = styled.div`
  ${tw`
    flex
    flex-col
    
    items-end
  `}
`;

const NicknameUpdateBox = styled.span`
  ${tw`
    underline
    cursor-pointer
  `}
`;

const NicknameInput = styled.input`
  ${tw`
    block 
    w-32
    rounded-md 
    border-0 
    py-1.5 
    text-gray-900 
    shadow-sm 
    ring-1 
    ring-inset 
    ring-gray-300 
    placeholder:text-gray-400 
    text-center
    focus:ring-2 
    focus:ring-inset 
    focus:ring-indigo-600 
    sm:text-sm 
    sm:leading-6
  `}
`;

const IconBox = styled.div`
  ${tw`
    flex
  `}
`;

const Icon = styled.img`
  ${tw`
    cursor-pointer
  `}
`;

export {
  Container,
  Nickname,
  NicknameUpdateWrapper,
  NicknameUpdateBox,
  NicknameInput,
  IconBox,
  Icon,
};
