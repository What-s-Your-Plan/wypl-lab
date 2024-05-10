import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';

import NavEventBar from './NavEventBar/NavEventBar';
import useJsonWebTokensStore from '@/stores/TokenStore';
import { BROWSER_PATH } from '@/constants/Path';

import * as S from './Navbar.styled';

import logo from '@/assets/images/logo.png';

function Navbar() {
  const navigate = useNavigate();
  const { accessToken } = useJsonWebTokensStore();
  useEffect(() => {
    const EventSource = EventSourcePolyfill || NativeEventSource;
    const source = new EventSource(
      `${import.meta.env.VITE_BASE_URL}/notification/v1/notifications/subscribe`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
        heartbeatTimeout: 30000,
        withCredentials: true,
      },
    );

    source.onmessage = function (event) {
      console.log(event.data);
    };

    return () => {
      source.close();
    };
  }, []);

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
