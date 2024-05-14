import LoadingBar from './LoadingBar';

import { BgColors } from '@/assets/styles/colorThemes';
import X from '@/assets/icons/x.svg';

import * as S from './Toast.styled';

function Toast({ type, message, duration: initialTime }: ToastType) {
  const changeColor = (): BgColors => {
    if (type === 'NOTIFICATION') {
      return 'labelGreen';
    }
    return 'labelRed';
  };

  return (
    <S.Container $bgColor={changeColor()} $textColor={'white'}>
      <S.HeaderWrapper>
        <S.Icon src={X} className={'whiteImg'} />
      </S.HeaderWrapper>
      <S.MessageWrapper>
        <S.Message>{message}</S.Message>
      </S.MessageWrapper>
      <LoadingBar initialTime={initialTime} />
    </S.Container>
  );
}

export default Toast;
