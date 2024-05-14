import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import GoogleLoadingAnimation from '@/components/animation/GoogleLoading';

import useMemberStore from '@/stores/MemberStore';

import useQueryParams from '@/hooks/useSearchParams';
import useMemberProfile from '@/hooks/api/useMemberProfile';
import useJsonWebTokens from '@/hooks/api/useJsonWebTokens';

import OAUTH_PROVIDER from '@/constants/OAuth';
import { BROWSER_PATH } from '@/constants/Path';

import * as S from './GoogleOAuth.styled';

function GoogleOAuth() {
  const navigate = useNavigate();

  const { code } = useQueryParams();
  const { memberId } = useMemberStore();
  const { requestMemberProfile } = useMemberProfile();
  const { requestIssueTokens } = useJsonWebTokens();

  const fetchJsonWebTokens = async () => {
    const param: IssueTokenParams = { code };
    const body = await requestIssueTokens(param, OAUTH_PROVIDER.GOOGLE);
    if (body === null || memberId === undefined) {
      navigate(BROWSER_PATH.LANDING);
      return;
    }
    await requestMemberProfile(memberId);
    navigate(BROWSER_PATH.CALENDAR);
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
