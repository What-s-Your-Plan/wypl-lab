import * as S from './GoogleOAuthButton.styled';

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
const REDIRECT_URI = import.meta.env.VITE_GOOGLE_REDIRECT_URI;

function GoogleOAuthButton() {
  const googleOauthUrl: string = `https://accounts.google.com/o/oauth2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email`;

  return (
    <S.GoogleButton href={googleOauthUrl}>Sign in with Google</S.GoogleButton>
  );
}

export default GoogleOAuthButton;
