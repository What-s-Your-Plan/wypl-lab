import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import logo from '@/assets/images/logo.png';
import NavEventBar from '@/components/navbar/NavEventBar/NavEventBar';
import MemberSheet from '@/components/navbar/sheet/member/MemberSheet';
import { BROWSER_PATH } from '@/constants/Path';

import * as S from './Navbar.styled';
import NotificationSheet from './sheet/notification/NotificationSheet';
import Sheet from './sheet/Sheet';

function Navbar() {
  const navigate = useNavigate();

  const [sheet, setSheet] = useState<SheetType>('NONE');

  const changeSheet = (newSheet: SheetType) => {
    if (sheet === newSheet) {
      resetSheet();
      return;
    }
    setSheet(newSheet);
  };

  const resetSheet = () => {
    setSheet('NONE');
  };

  return (
    <S.Container>
      <S.Wrapper>
        <S.Logo
          onClick={() => navigate(BROWSER_PATH.CALENDAR)}
          src={logo}
        ></S.Logo>
        <NavEventBar changeSheetEvent={changeSheet} />
      </S.Wrapper>
      {sheet === 'MEMBER' && (
        <Sheet
          resetSheetEvent={resetSheet}
          childrenComponent={<MemberSheet />}
        />
      )}
      {sheet === 'NOTIFICATION' && (
        <Sheet
          resetSheetEvent={resetSheet}
          childrenComponent={<NotificationSheet />}
        />
      )}
    </S.Container>
  );
}

export default Navbar;
