import { useState } from 'react';

export interface Repeat {
  repeatCycle: 'week' | 'month' | 'year'; // 필수
  week: number; // week일 경우 몇 주에 한번 반복할지, 선택
  dayOfWeek: number; // bit로 0100010와 같은 형태로, 선택
  day: number; //월 년도 반복일 경우, 선택
  month: number; // 년도 반복일 경우, 선택
  lastDay: boolean; // 마지막날 반복인 경우 true, 필수
  startRDate: Date; // 반복 시작일 (시간 불필요) 필수
  hasEndDate: boolean; // 앤드 데이트 여부 필수
  endRDate: Date; // 선택
}

export interface Schedule {
  title: string; // 필수
  description: string; // 선택
  startDate: Date; // 날짜 + 시간, 필수
  endDate: Date; // 날짜 + 시간, 필수
  startAMPM: 'AM' | 'PM';
  endAMPM: 'AM' | 'PM';
  startHour: number;
  endHour: number;
  startMinute: number;
  endMinute: number;
  category: 'Member' | 'Group'; // 개인: Member, 그룹: Group, 필수
  ownerId: number; //개인은 멤버 인덱스, 그룹은 그룹 인덱스, 필수
  alarmTime: string; //'23:59', 선택
  labelId: number; // 선택, 그룹인 경우 무조건 없음
  members: Array<{ member_id: number }>; // 개인 일정은 한명만
  repeat: boolean; // 선택
}

const initialSchedule: Schedule & Repeat = {
  title: '',
  description: '',
  startDate: new Date(),
  endDate: new Date(),
  startAMPM: 'AM',
  endAMPM: 'AM',
  startHour: 12,
  endHour: 12,
  startMinute: 0,
  endMinute: 0,
  category: 'Member',
  ownerId: 0,
  alarmTime: '',
  labelId: 0,
  members: [],
  repeat: false,
  repeatCycle: 'week',
  week: 1,
  dayOfWeek: 0,
  day: 1,
  month: 1,
  lastDay: false,
  startRDate: new Date(),
  hasEndDate: false,
  endRDate: new Date(),
};

function useForm<S>(
  initialState: S | (() => S), // Object
  onSubmit: () => Promise<void>,
  validate?: (values: S) => Array<boolean>,
) {
  const [states, setStates] = useState<S>({ ...(initialState as S) });
  const [errors, setErrors] = useState<Array<boolean>>(
    Object.keys(initialState as object).map(() => {
      return true;
    }),
  );

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setStates((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    if (validate) {
      const result = validate(states);
      setErrors(result);
      if (result.includes(false)) {
        return;
      }
    }
    await onSubmit();
  };

  return [states, errors, handleChange, handleSubmit];
}

export default useForm;
export { initialSchedule };
