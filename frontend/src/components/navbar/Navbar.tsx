import { useNavigate } from 'react-router-dom';

import NavEventBar from './NavEventBar/NavEventBar';

import { BROWSER_PATH } from '@/constants/Path';

import * as S from './Navbar.styled';

import logo from '@/assets/images/logo.png';

function Navbar() {
  const navigate = useNavigate();

  return (
    <S.Container>
      <S.Logo
        onClick={() => navigate(BROWSER_PATH.CALENDAR)}
        src={logo}
      ></S.Logo>
      <NavEventBar />
    </S.Container>
  );
}

export default Navbar;
