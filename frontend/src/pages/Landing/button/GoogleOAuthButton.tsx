import DummyOAuthButton from './DummyOAuthButton';
import * as S from './GoogleOAuthButton.styled';

function GoogleOAuthButton() {
  const { MODE, VITE_GOOGLE_CLIENT_ID, VITE_GOOGLE_REDIRECT_URI } = import.meta
    .env;

  const googleOauthUrl: string = `https://accounts.google.com/o/oauth2/auth?client_id=${VITE_GOOGLE_CLIENT_ID}&redirect_uri=${VITE_GOOGLE_REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email`;

  return (
    <S.Container>
      <S.GoogleButton href={googleOauthUrl}>Sign in with Google</S.GoogleButton>
      {MODE !== 'prod' ? <DummyOAuthButton /> : <></>}
    </S.Container>
  );
}

export default GoogleOAuthButton;
