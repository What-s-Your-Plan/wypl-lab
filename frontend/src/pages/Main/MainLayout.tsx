import { Outlet } from 'react-router-dom';

import Navbar from '@/components/navbar/Navbar';
import * as S from './MainLayout.styled';

function MainLayout() {
  return (
    <S.Container className="bg-default-warmgray">
      <Navbar />
      <S.MarginWrapper>
        <Outlet />
      </S.MarginWrapper>
    </S.Container>
  );
}

export default MainLayout;
