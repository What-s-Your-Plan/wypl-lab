type Data = {
  id: string; // 회원ID + 시스템시간 (ms)
  name: string; // "notification" 고정 값
  data: Notification;
};

type WYPLNotification = {
  id: string;
  member_id: number;
  message: string;
  is_read: boolean; // 알림 읽음 여부
  is_acted: boolean;
  type_code: string;
  target_id: number; //group id 또는 일정 ID
};

type WYPLNotificationResponse = {
  notification: WYPLNotification[];
  last_id: string;
  has_next: boolean;
  page_size: number;
};
