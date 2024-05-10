import Button from '../../../common/Button';

import Check from '@/assets/icons/check.svg';
import X from '@/assets/icons/x.svg';

type GroupNotificationProps = {
  notification: WYPLNotification;
};

function GroupNotification({ notification }: GroupNotificationProps) {
  const handleReject = () => {
    console.log('reject');
  };
  const handleAccept = () => {
    console.log('accept');
  };

  return (
    <div className="container w-full flex flex-col gap-2 pt-2">
      <div>{notification.message}</div>
      <div className="w-full flex justify-center gap-4">
        <Button
          $size="lg"
          $width="30%"
          className="!bg-zinc-500"
          onClick={handleReject}
        >
          <img src={X} alt="X" className="whiteImg w-5 mr-2" />
          <span className="text-default-white font-semibold">거부</span>
        </Button>
        <Button
          $size="lg"
          $width="30%"
          $bgColor="labelGreen"
          onClick={handleAccept}
        >
          <img src={Check} alt="Check" className="whiteImg w-5 mr-2" />
          <span className="text-default-white font-semibold">수락</span>
        </Button>
      </div>
    </div>
  );
}

export default GroupNotification;
