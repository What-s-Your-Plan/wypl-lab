type Data = {
  id: string; // 회원ID + 시스템시간 (ms)
  name: string; // "notification" 고정 값
  data: Notification;
};

type Notification = {
  id: string;
  member_id: number;
  message: string;
  is_read: boolean; // 알림 읽음 여부
  buttons: NotificationButtons[];
  type_code: string;
};

type NotificationButtons = {
  text: string; // 버튼 텍스트
  action_url: string; // 버튼 클릭시 이동 url
  color: string; // 버튼 색상
  logo: string; // 버튼 로고
};
