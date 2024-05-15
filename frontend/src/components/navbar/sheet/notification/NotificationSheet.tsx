import { useEffect } from 'react';
import { useState } from 'react';

import getNotification from '@/services/notification/getNotification';
import deleteNotification from '@/services/notification/deleteNotification';

import GroupNotification from './GroupNotification';
import ReviewNotification from './ReviewNotification';

import { Divider } from '@/components/common/Divider';
import Bell from '@/assets/icons/bell.svg';
import Button from '@/components/common/Button';
import * as S from './NotificationSheet.styled';

function NotificationSheet() {
  const [notifications, setNotifications] = useState<WYPLNotificationResponse>({
    notification: [],
    last_id: '',
    has_next: true,
    page_size: 10,
  });

  const renderNotification = () => {
    return notifications?.notification.map((notification) => {
      return (
        <div key={notification.id} className="w-full mb-4">
          <Divider />
          {notification.type_code === 'GROUP' ? (
            <GroupNotification
              key={notification.id}
              notification={notification}
            />
          ) : (
            <ReviewNotification
              key={notification.id}
              notification={notification}
            />
          )}
        </div>
      );
    });
  };

  const fetchNotifications = async () => {
    const response = await getNotification(notifications?.last_id);
    const newNotifications = response;
    newNotifications.notification = [
      ...notifications.notification,
      ...response.notification,
    ];
    setNotifications(newNotifications);
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  return (
    <S.Container>
      <div className="h-[10%] flex items-center">
        <img src={Bell} alt="알림" />
      </div>
      {notifications?.notification.length > 0 ? (
        <div className="scrollBar w-full h-4/5 flex flex-col">
          {renderNotification()}
          {notifications.has_next && (
            <div className="cursor-pointer" onClick={fetchNotifications}>
              알람 더보기
            </div>
          )}
        </div>
      ) : (
        <div className="w-full h-4/5 flex justify-center items-center">
          알림함이 비어있어요!
        </div>
      )}
      <div className="flex justify-end mt-1">
        <Button
          $size="lg"
          $width="120px"
          $border="black"
          onClick={() => {
            deleteNotification();
          }}
        >
          알림함 비우기
        </Button>
      </div>
    </S.Container>
  );
}

export default NotificationSheet;
