import * as S from './GoogleOAuthButton.styled';

function DummyOAuthButton() {
  return (
    <S.GoogleButton onClick={() => console.log('run')}>
      Sign in with Dummy
    </S.GoogleButton>
  );
}

export default DummyOAuthButton;
