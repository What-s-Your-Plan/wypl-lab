import styled from 'styled-components';
import tw from 'twin.macro';

const Container = styled.div`
  ${tw`
    flex
    flex-col
    justify-between
    
  `}
`;

const PopOverWrapper = styled.div`
  ${tw`
    h-6
    w-6

    fixed
    mt-2
  `}
`;

const Wrapper = styled.div``;

const GroupContainer = styled.div`
  ${tw`
    flex 
    justify-between
    items-center
    `}
`;

const GroupWrapper = styled.div`
  ${tw`
    flex 
    justify-between
    items-center
    h-full
    w-full
    pl-2
    `}
`;

const Box = styled.div`
  ${tw`
    flex 
    `}
`;

export {
  Container,
  PopOverWrapper,
  Wrapper,
  GroupContainer,
  GroupWrapper,
  Box,
};
