import { useEffect } from 'react';

import useQueryParams from '@/hooks/useSearchParams';
import issueTokens from '@/services/auth/signIn';
import OAUTH_PROVIDER from '@/constants/OAuth';

function GoogleOAuth() {
  const { code } = useQueryParams();

  // TODO: 로딩 화면 넣기

  useEffect(() => {
    if (code !== undefined) {
      const param: IssueTokenParams = { code };
      console.log(issueTokens(param, OAUTH_PROVIDER.GOOGLE));
    }
  }, [code]);

  return <div>{code}</div>;
}

export default GoogleOAuth;
