import { useNavigate } from 'react-router-dom';

import deleteJsonWebTokens from '@/services/auth/logout';
import issueTokens from '@/services/auth/signIn';

import useMemberStore from '@/stores/MemberStore';
import useJsonWebTokensStore from '@/stores/TokenStore';

import { BROWSER_PATH } from '@/constants/Path';

export default function useJsonWebTokens() {
  const { setAccessToken, setRefreshToken, resetTokens } =
    useJsonWebTokensStore();
  const { setId, resetMember } = useMemberStore();

  const navigate = useNavigate();

  const requestIssueTokens = async (
    params: IssueTokenParams,
    provider: string,
  ) => {
    await issueTokens(params, provider).then(
      ({ access_token, refresh_token, member_id }) => {
        setAccessToken(access_token);
        setRefreshToken(refresh_token);
        setId(member_id);
      },
    );
  };

  const requestDeleteTokens = async () => {
    await deleteJsonWebTokens().finally(() => {
      resetTokens();
      resetMember();
      navigate(BROWSER_PATH.LANDING);
    });
  };

  return { requestIssueTokens, requestDeleteTokens };
}
