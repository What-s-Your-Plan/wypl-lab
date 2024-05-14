import Toast from '../toast/Toast';

import useToast from '@/hooks/useToast';

import * as S from './Notification.styled';

function Notification() {
  const { toasts } = useToast();

  return (
    <S.Container>
      {toasts.map((value: ToastType) => (
        <Toast {...value} key={value.id} />
      ))}
    </S.Container>
  );
}

export default Notification;
