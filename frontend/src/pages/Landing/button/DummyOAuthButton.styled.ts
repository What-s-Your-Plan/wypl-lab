import styled from 'styled-components';
import tw from 'twin.macro';

const Container = styled.div`
  ${tw`
        flex
        flex-col
        justify-center
        items-center

        mt-5
    `}
`;

const Wrapper = styled.div`
  ${tw`
        w-[188px]
    `}
`;

const Input = styled.input`
  ${tw`
    block 
    w-full 
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

export { Container, Wrapper, Input };
