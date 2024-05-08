import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useJsonWebTokensStore from '@/stores/TokenStore';

import OAUTH_PROVIDER from '@/constants/OAuth';
import { BROWSER_PATH } from '@/constants/Path';
import useQueryParams from '@/hooks/useSearchParams';
import issueTokens from '@/services/auth/signIn';

function GoogleOAuth() {
  const { code } = useQueryParams();
  const navigate = useNavigate();

  const { setAccessToken, setRefreshToken } = useJsonWebTokensStore();
  // TODO: 로딩 화면 넣기

  const fetchJsonWebTokens = async () => {
    const param: IssueTokenParams = { code };
    const body = await issueTokens(param, OAUTH_PROVIDER.GOOGLE);
    if (body === null) {
      navigate(BROWSER_PATH.LANDING);
      return;
    }
    setAccessToken(body.access_token);
    setRefreshToken(body.refresh_token);
    navigate(BROWSER_PATH.CALENDAR);
  };

  useEffect(() => {
    if (code !== undefined) {
      fetchJsonWebTokens();
    }
  }, [code]);

  return <div>{code}</div>;
}

export default GoogleOAuth;
