import { Dispatch, SetStateAction, useState } from 'react';

const initialSchedule: Schedule & Repeat = {
  title: '',
  description: '',
  startDate: '',
  endDate: '',
  isAllday: false,
  startAMPM: 'AM',
  endAMPM: 'AM',
  startHour: 12,
  endHour: 12,
  startMinute: 0,
  endMinute: 0,
  category: 'Member',
  groupId: 0,
  label: null,
  members: [],
  isRepetition: false,
  repetitionCycle: '매일',
  week: 1,
  dayOfWeek: 0,
  day: 1,
  month: 1,
  period: '계속 반복',
  endRDate: '',
};

function useForm<S>(
  initialState: S | (() => S), // Object
  onSubmit: (state: S) => Promise<void>,
  validate?: (values: S) => Array<boolean>,
): {
  form: S;
  errors: boolean[];
  handleChange: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>,
  ) => void;
  handleSubmit: () => Promise<void>;
  setForm: Dispatch<SetStateAction<S>>;
} {
  const [form, setForm] = useState<S>({ ...(initialState as S) });
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
    setForm((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async () => {
    if (validate) {
      const result = validate(form);
      setErrors(result);
      if (result.includes(false)) {
        return;
      }
    }
    await onSubmit(form);
  };

  return { form, errors, handleChange, handleSubmit, setForm };
}

export default useForm;
export { initialSchedule };
