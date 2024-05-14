import { useNavigate } from 'react-router-dom';

import deleteJsonWebTokens from '@/services/auth/logout';
import issueTokens from '@/services/auth/signIn';
import reissueTokens from '@/services/auth/reissue';

import useMemberStore from '@/stores/MemberStore';
import useJsonWebTokensStore from '@/stores/TokenStore';

import useLoading from '@/hooks/useLoading';

import { BROWSER_PATH } from '@/constants/Path';

export default function useJsonWebTokens() {
  const { canStartLoading, endLoading } = useLoading();

  const { refreshToken, setAccessToken, setRefreshToken, resetTokens } =
    useJsonWebTokensStore();
  const { setId, resetMember } = useMemberStore();

  const navigate = useNavigate();

  const requestIssueTokens = async (
    params: IssueTokenParams,
    provider: string,
  ) => {
    if (canStartLoading()) {
      return;
    }
    await issueTokens(params, provider)
      .then(({ access_token, refresh_token, member_id }) => {
        setAccessToken(access_token);
        setRefreshToken(refresh_token);
        setId(member_id);
      })
      .finally(() => {
        endLoading();
      });
  };

  const requestDeleteTokens = async () => {
    if (canStartLoading()) {
      return;
    }
    await deleteJsonWebTokens().finally(() => {
      resetTokens();
      resetMember();
      navigate(BROWSER_PATH.LANDING);
      endLoading();
    });
  };

  const requestReissueTokens = async () => {
    if (canStartLoading() || refreshToken === null) {
      return;
    }
    const params: ReissueTokenParams = {
      refresh_token: refreshToken,
    };
    await reissueTokens(params)
      .then(({ access_token, refresh_token, member_id }) => {
        setAccessToken(access_token);
        setRefreshToken(refresh_token);
        setId(member_id);
      })
      .finally(() => {
        endLoading();
      });
  };

  return { requestIssueTokens, requestDeleteTokens, requestReissueTokens };
}
