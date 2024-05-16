import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { EventSourcePolyfill } from 'event-source-polyfill';

import logo from '@/assets/images/logo.png';

import MemberSheet from '@/components/navbar/sheet/member/MemberSheet';
import NavEventBar from '@/components/navbar/NavEventBar/NavEventBar';
import NotificationSheet from '@/components/navbar/sheet/notification/NotificationSheet';
import Sheet from '@/components/navbar/sheet/Sheet';

import useMemberProfile from '@/hooks/api/useMemberProfile';
import useMemberStore from '@/stores/MemberStore';
import useJsonWebTokensStore from '@/stores/TokenStore';

import { BROWSER_PATH } from '@/constants/Path';

import * as S from './Navbar.styled';
import useToastStore from '@/stores/ToastStore';

interface CustomEventMap {
  sse: MessageEvent;
  notification: MessageEvent;
}

type ExtendedEventSource = EventSource & {
  addEventListener<K extends keyof CustomEventMap>(
    type: K,
    listener: (this: EventSource, ev: CustomEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions,
  ): void;
  lastEventId: string; // lastEventId를 명시적으로 추가
};

type SheetComponent = {
  sheetType: SheetType;
  component: JSX.Element;
};

function Navbar() {
  const navigate = useNavigate();
  const { addToast } = useToastStore();
  const { accessToken } = useJsonWebTokensStore();
  const { memberId } = useMemberStore();
  const { requestMemberProfile } = useMemberProfile();
  const [lastEventId, setLastEventId] = useState<string>('');

  useEffect(() => {
    let source: ExtendedEventSource | null = null;

    const EventSource = EventSourcePolyfill;
    function connect() {
      source = new EventSource(
        `${import.meta.env.VITE_BASE_URL}/notification/v1/notifications/subscribe`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Last-Event-ID': `${lastEventId}`,
          },
          heartbeatTimeout: 1 * 1000 * 60,
        },
      ) as ExtendedEventSource;

      source.onmessage = function (event) {
        console.log(event);
      };

      source.onerror = function (event) {
        console.error(event);
        if (source) {
          source.close();
        }
      };

      // Connection
      source.onopen = function () {};

      // Heart Beat
      source.addEventListener('sse', function (event) {
        setLastEventId(event.lastEventId);
      });

      source.addEventListener('notification', function (event) {
        const jsonAsString: string = event.data as string;
        const body: WYPLNotification = JSON.parse(jsonAsString);
        addToast({
          duration: 300,
          type: 'NOTIFICATION',
          message: body.message,
        });
        setLastEventId(event.lastEventId);
      });
    }

    connect();

    return () => {
      if (source) {
        source.close();
      }
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
    requestMemberProfile(memberId!);
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
