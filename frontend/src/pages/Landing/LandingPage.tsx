import GoogleOAuthButton from './GoogleOAuthButton';
import * as S from './LandingPage.styled';

function LandingPage() {
  // https://velog.io/@wynter24/%ED%94%84%EB%A1%A0%ED%8A%B8%EA%B0%80-%ED%95%98%EB%8A%94-%EC%B9%B4%EC%B9%B4%EC%98%A4-%EC%86%8C%EC%85%9C%EB%A1%9C%EA%B7%B8%EC%9D%B8-React

  return (
    <S.Container>
      <GoogleOAuthButton />
    </S.Container>
  );
}

export default LandingPage;
