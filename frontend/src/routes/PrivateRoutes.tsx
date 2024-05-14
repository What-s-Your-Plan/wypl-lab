import { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';

import useJsonWebTokensStore from '@/stores/TokenStore';

import { BROWSER_PATH } from '@/constants/Path';

function PrivateWrapper() {
  const navigate = useNavigate();
  const { accessToken, refreshToken } = useJsonWebTokensStore();

  useEffect(() => {
    if (accessToken === null || refreshToken === null) {
      navigate(BROWSER_PATH.LANDING);
    }
  }, []);

  return <Outlet />;
}

export default PrivateWrapper;
