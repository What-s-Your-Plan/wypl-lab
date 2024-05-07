import styled from 'styled-components';
import tw from 'twin.macro';

const Container = styled.div`
  ${tw`
    mb-5
  `}
`;

const ProfileImage = styled.img`
  height: 24px;
  width: 24px;

  border-radius: 100%;
`;

export { Container, ProfileImage };
