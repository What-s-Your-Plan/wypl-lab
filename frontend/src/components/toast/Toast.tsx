import LoadingBar from './LoadingBar';

import { BgColors } from '@/assets/styles/colorThemes';
import X from '@/assets/icons/x.svg';

import * as S from './Toast.styled';

type ToastProps = {
  content: ToastContent;
  removeEvent: (id: number) => void;
};

function Toast({ content, removeEvent }: ToastProps) {
  const changeColor = (): BgColors => {
    if (content.type === 'NOTIFICATION') {
      return 'labelGreen';
    }
    return 'labelRed';
  };

  return (
    <S.Container $bgColor={changeColor()} $textColor={'white'}>
      <S.HeaderWrapper>
        <S.Icon
          src={X}
          className={'whiteImg'}
          onClick={() => removeEvent(content.id)}
        />
      </S.HeaderWrapper>
      <S.MessageWrapper>
        <S.Message>{content.message}</S.Message>
      </S.MessageWrapper>
      <LoadingBar initialTime={content.duration} />
    </S.Container>
  );
}

export default Toast;
