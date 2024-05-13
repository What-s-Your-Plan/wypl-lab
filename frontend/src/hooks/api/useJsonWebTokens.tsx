import issueTokens from '@/services/auth/signIn';
import useMemberStore from '@/stores/MemberStore';
import useJsonWebTokensStore from '@/stores/TokenStore';

export default function useJsonWebTokens() {
  const { setAccessToken, setRefreshToken } = useJsonWebTokensStore();
  const { setId } = useMemberStore();

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

  return { requestIssueTokens };
}
