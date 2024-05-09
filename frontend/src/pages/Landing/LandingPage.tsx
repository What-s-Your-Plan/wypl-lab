import GoogleOAuthButton from './button/GoogleOAuthButton';

import * as S from './LandingPage.styled';

function LandingPage() {
  return (
    <S.Container>
      <GoogleOAuthButton />
    </S.Container>
  );
}

export default LandingPage;
