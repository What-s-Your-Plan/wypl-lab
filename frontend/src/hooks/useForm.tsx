import { useState } from 'react';

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
