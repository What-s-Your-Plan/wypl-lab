import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import mockIssueTokens from '@/services/auth/mockSignIn';
import useJsonWebTokensStore from '@/stores/TokenStore';
import useMemberStore from '@/stores/MemberStore';
import { BROWSER_PATH } from '@/constants/Path';

import * as S from './GoogleOAuthButton.styled';
import * as DS from './DummyOAuthButton.styled';

function DummyOAuthButton() {
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>('');
  const changeEmail = (e: any) => {
    setEmail(e.target.value);
  };

  const { setAccessToken, setRefreshToken } = useJsonWebTokensStore();
  const { setMemberId } = useMemberStore();

  const fetchMockJsonWebTokens = async () => {
    if (email.length < 8 || email.length > 16) {
      console.warn(
        `이메일(${email}, ${email.length})의 길이가 8자 미만, 16자 이상입니다.`,
      );
      return;
    }

    const params: MockIssueTokenParams = { email };
    const body = await mockIssueTokens(params);
    if (body === null) {
      navigate(BROWSER_PATH.LANDING);
      return;
    }
    updateStores(body);
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

  return (
    <DS.Container>
      <DS.Wrapper>
        <DS.Input
          type="email"
          name="email"
          id="email"
          placeholder="아이디 8자 이상 16자 이하"
          onChange={changeEmail}
        />
      </DS.Wrapper>
      <S.GoogleButton onClick={() => fetchMockJsonWebTokens()}>
        Sign in with Dummy
      </S.GoogleButton>
    </DS.Container>
  );
}

export default DummyOAuthButton;
