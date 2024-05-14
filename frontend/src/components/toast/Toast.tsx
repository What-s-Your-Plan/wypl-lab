import LoadingBar from './LoadingBar';

import X from '@/assets/icons/x.svg';

import * as S from './Toast.styled';

function Toast() {
  // TODO: 400
  // TODO: 500
  // TODO: Notification
  return (
    <S.Container $bgColor={'labelRed'} $textColor={'white'}>
      <S.HeaderWrapper>
        <S.Icon src={X} className={'whiteImg'} />
      </S.HeaderWrapper>
      <S.MessageWrapper>
        <S.Message>message</S.Message>
      </S.MessageWrapper>
      <LoadingBar />
    </S.Container>
  );
}

export default Toast;
