import { useNavigate } from 'react-router-dom';

import NavEventBar from './NavEventBar/NavEventBar';

import * as S from './Navbar.styled';

function Navbar() {
  const navigate = useNavigate();

  return (
    <S.Container>
      <S.Logo
        onClick={() => navigate('./calendar')}
        src={'./logo-ci.png'}
      ></S.Logo>
      <NavEventBar />
    </S.Container>
  );
}

export default Navbar;
