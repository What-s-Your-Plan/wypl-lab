interface Repeat {
  repetitionCycle: string; // 필수
  week: number; // week일 경우 몇 주에 한번 반복할지, 선택
  dayOfWeek: number; // bit로 0100010와 같은 형태로, 선택
  day: number; //월 년도 반복일 경우, 선택
  month: number; // 년도 반복일 경우, 선택
  period: string; // 앤드 데이트 여부 필수
  endRDate: string; // 선택
}

type Label = {
  label_id: number;
  title: string;
  color: string;
  member_id: number;
};

type LabelResponse = {
  label_id: number;
  title: string;
  color: string;
};

type Member = {
  member_id: number;
  nickname: string;
  oauth_id: string;
  profile_image: string;
};

type GroupResponse = {
  group_id: number; // 그룹의 인덱스
  color: string; // 헥사 코드(개인화된 그룹 색상)
  title: string; // 그룹 이름
};

interface Schedule {
  title: string; // 필수
  description: string; // 선택
  startDate: string; // 날짜 + 시간, 필수
  endDate: string; // 날짜 + 시간, 필수
  isAllday: boolean;
  startAMPM: string;
  endAMPM: string;
  startHour: number;
  endHour: number;
  startMinute: number;
  endMinute: number;
  category: 'Member' | 'Group'; // 개인: Member, 그룹: Group, 필수
  groupId: number;
  label: Label | null;
  members: Array<Member>; // 개인 일정은 한명만
  isRepetition: boolean; // 선택
}

type CalendarSchedule = {
  schedule_id: number; // 일정의 인덱스
  title: string;
  category: string;
  start_date: string; //ex) "2024-04-16T10:57:00"
  end_date: string; //ex) "2024-04-16T10:57:00"
  label: LabelResponse | null;
  group: GroupResponse | null;
};

type CalendarsResponse = {
  schedule_count: number; // 개인 일정의 총 개수
  schedules: Array<CalendarSchedule>;
};
