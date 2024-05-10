import { useNavigate } from 'react-router-dom';
import Button from '../../../common/Button';

import Pen from '@/assets/icons/pen.svg';

type ReviewNotificationProps = {
  notification: WYPLNotification;
};

function ReviewNotification({ notification }: ReviewNotificationProps) {
  const navigator = useNavigate();
  const handleGotoWrite = () => {
    navigator(`/review/write/${notification.target_id}`);
  };

  return (
    <div className="container flex flex-col pt-2">
      {notification.message}
      <Button $size="lg" onClick={handleGotoWrite}>
        <img src={Pen} alt="펜" className="w-5 mr-2" />
        회고록 작성하러 가기
      </Button>
    </div>
  );
}

export default ReviewNotification;
