import styled from 'styled-components';
import tw from 'twin.macro';

const Container = styled.div``;

const GroupContainer = styled.div``;

const GroupWrapper = styled.div`
  ${tw`
    flex 
    justify-between
    items-center
    `}
`;

const Box = styled.div`
  ${tw`
    flex 
    gap-4
    `}
`;

export { Container, GroupContainer, GroupWrapper, Box };
