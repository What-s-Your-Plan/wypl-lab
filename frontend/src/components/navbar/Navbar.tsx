import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import logo from '@/assets/images/logo.png';

import MemberSheet from '@/components/navbar/sheet/member/MemberSheet';
import NavEventBar from '@/components/navbar/NavEventBar/NavEventBar';
import NotificationSheet from '@/components/navbar/sheet/notification/NotificationSheet';
import Sheet from '@/components/navbar/sheet/Sheet';

import { BROWSER_PATH } from '@/constants/Path';

import * as S from './Navbar.styled';

type SheetComponent = {
  sheetType: SheetType;
  component: JSX.Element;
};

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

  const sheetComponents: SheetComponent[] = [
    {
      sheetType: 'MEMBER',
      component: <MemberSheet />,
    },
    {
      sheetType: 'NOTIFICATION',
      component: <NotificationSheet />,
    },
  ];

  return (
    <S.Container>
      <S.Wrapper>
        <S.Logo
          onClick={() => navigate(BROWSER_PATH.CALENDAR)}
          src={logo}
        ></S.Logo>
        <NavEventBar changeSheetEvent={changeSheet} />
      </S.Wrapper>
      {sheetComponents.map(
        (sheetComponent: SheetComponent) =>
          sheet === sheetComponent.sheetType && (
            <Sheet
              key={sheetComponent.sheetType}
              resetSheetEvent={resetSheet}
              childrenComponent={sheetComponent.component}
            />
          ),
      )}
    </S.Container>
  );
}

export default Navbar;
