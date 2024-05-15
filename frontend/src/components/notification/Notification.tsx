import Toast from '../toast/Toast';

import useToastStore from '@/stores/ToastStore';

import * as S from './Notification.styled';

function Notification() {
  const { toasts, removeToast } = useToastStore();

  return (
    <S.Container>
      {toasts.map((toast: ToastContent) => (
        <Toast content={toast} removeEvent={removeToast} key={toast.id} />
      ))}
    </S.Container>
  );
}

export default Notification;
