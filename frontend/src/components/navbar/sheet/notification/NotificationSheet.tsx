import getNotification from '@/services/notification/getNotification';
import { useEffect } from 'react';
import { useState } from 'react';
import GroupNotification from './GroupNotification';
import ReviewNotification from './ReviewNotification';

import { Divider } from '@/components/common/Divider';
import * as S from './NotificationSheet.styled';
import Bell from '@/assets/icons/bell.svg';
import Button from '@/components/common/Button';
import deleteNotification from '@/services/notification/deleteNotification';

function NotificationSheet() {
  const [notifications, setNotifications] =
    useState<WYPLNotificationResponse>();

  const renderNotification = () => {
    return notifications?.notification.map((notification) => {
      return (
        <div key={notification.id} className="w-full mb-4">
          <Divider />
          {notification.type_code === 'Group' ? (
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

  useEffect(() => {
    const fetchNotifications = async () => {
      const response = await getNotification(notifications?.last_id);
      setNotifications(response);
    };
    fetchNotifications();
  }, []);
  return (
    <S.Container>
      <div className="h-[10%] flex items-center">
        <img src={Bell} alt="알림" />
      </div>
      <div className="scrollBar w-full h-4/5 flex flex-col">
        {renderNotification()}
      </div>
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
