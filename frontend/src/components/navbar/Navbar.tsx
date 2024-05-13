import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';

import logo from '@/assets/images/logo.png';

import MemberSheet from '@/components/navbar/sheet/member/MemberSheet';
import NavEventBar from '@/components/navbar/NavEventBar/NavEventBar';
import NotificationSheet from '@/components/navbar/sheet/notification/NotificationSheet';
import Sheet from '@/components/navbar/sheet/Sheet';

import useJsonWebTokensStore from '@/stores/TokenStore';

import { BROWSER_PATH } from '@/constants/Path';

import * as S from './Navbar.styled';

type SheetComponent = {
  sheetType: SheetType;
  component: JSX.Element;
};

function Navbar() {
  const navigate = useNavigate();
  const { accessToken } = useJsonWebTokensStore();
  // const [lastEventId, setLastEventId] = useState<string>('');
  useEffect(() => {
    const EventSource = EventSourcePolyfill || NativeEventSource;
    const source = new EventSource(
      `${import.meta.env.VITE_BASE_URL}/notification/v1/notifications/subscribe`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          // 'Last-Event-ID': `${lastEventId}`,
        },
        heartbeatTimeout: 1800000,
      },
    );

    source.onopen = function (event) {
      console.log(event);
    };

    source.onmessage = function (event) {
      console.log(event);
    };

    source.onerror = function (event) {
      console.log(source);
      console.error(event);
      source.close();
    };

    source.addEventListener('sse', function (event) {
      console.log('최초연결');
      console.log('SSE Event:', event);
      // setLastEventId(event.lastEventId);
    });

    source.addEventListener('notification', function (event) {
      console.log(event);
      // setLastEventId(event.lastEventId);//
    });

    return () => {
      source.close();
    };
  }, []);

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

  useEffect(() => {
    resetSheet();
  }, [window.location.href]);

  return (
    <S.Container>
      <S.Wrapper>
        <S.Logo onClick={() => navigate(BROWSER_PATH.CALENDAR)} src={logo} />
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
