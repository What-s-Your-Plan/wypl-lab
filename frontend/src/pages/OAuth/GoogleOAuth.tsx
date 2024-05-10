import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useJsonWebTokensStore from '@/stores/TokenStore';
import useMemberStore from '@/stores/MemberStore';

import OAUTH_PROVIDER from '@/constants/OAuth';
import { BROWSER_PATH } from '@/constants/Path';
import useQueryParams from '@/hooks/useSearchParams';
import issueTokens from '@/services/auth/signIn';
import GoogleLoadingAnimation from '@/components/animation/GoogleLoading';

import * as S from './GoogleOAuth.styled';

function GoogleOAuth() {
  const { code } = useQueryParams();
  const navigate = useNavigate();

  const { setAccessToken, setRefreshToken } = useJsonWebTokensStore();
  const { setId: setMemberId } = useMemberStore();

  const fetchJsonWebTokens = async () => {
    const param: IssueTokenParams = { code };
    const body = await issueTokens(param, OAUTH_PROVIDER.GOOGLE);
    if (body === null) {
      navigate(BROWSER_PATH.LANDING);
      return;
    }
    await updateStores(body);
    navigate(BROWSER_PATH.CALENDAR);
  };

  const updateStores = ({
    access_token,
    refresh_token,
    member_id,
  }: IssueTokenResponse) => {
    setAccessToken(access_token);
    setRefreshToken(refresh_token);
    setMemberId(member_id);
  };

  useEffect(() => {
    if (code !== undefined) {
      fetchJsonWebTokens();
    }
  }, [code]);

  return (
    <S.Container>
      <GoogleLoadingAnimation />
    </S.Container>
  );
}

export default GoogleOAuth;
