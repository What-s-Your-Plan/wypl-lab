import Modal from '../common/Modal';
import SkedDetailPanel from './SkedDetailPanel';
import putSchedule from '@/services/schedule/putSchedule';
import useForm from '@/hooks/useForm';
import initialSchedule from '@/constants/ScheduleFormInit';
import getScheduleDetail from '@/services/schedule/getScheduleDetail';
import { useEffect, useState } from 'react';
import { padding0, stringToDate } from '@/utils/DateUtils';
import { isAllday } from '@/utils/DateUtils';

type DetailModalProps = {
  isOpen: boolean;
  scheduleId: number;
  handleClose: (() => void) | (() => Promise<void>);
  setUpdateTrue: () => void;
};

function createInit(schedule: ScheduleResponse) {
  const startDate = stringToDate(schedule.start_date);
  const endDate = stringToDate(schedule.end_date);
  const newInit = {
    ...initialSchedule,
    scheduleId: schedule.schedule_id,
    title: schedule.title,
    category: schedule.category as 'MEMBER' | 'GROUP',
    description: schedule.description ? schedule.description : '',
    startDate: `${startDate.getFullYear()}-${padding0(startDate.getMonth() + 1)}-${padding0(startDate.getDate())}`,
    endDate: `${endDate.getFullYear()}-${padding0(endDate.getMonth() + 1)}-${padding0(endDate.getDate())}`,
    startHour: startDate.getHours(),
    startMinute: startDate.getMinutes(),
    endHour: endDate.getHours(),
    endMinute: endDate.getMinutes(),
    startAMPM: startDate.getHours() >= 12 ? 'PM' : 'AM',
    endAMPM: endDate.getHours() >= 12 ? 'PM' : 'AM',
    isAllday: isAllday(startDate, endDate),
    groupId: schedule.group_id,
    members: schedule.members.map((member) => {
      return { member_id: member.member_id };
    }),
    repetition: schedule.repetition ? true : false,
  };
  if (schedule.repetition) {
    (newInit.week = schedule.repetition.week),
      (newInit.repetitionCycle = schedule.repetition.repetition_cycle),
      (newInit.startDate = schedule.repetition.repetition_start_date),
      (newInit.endDate = schedule.repetition.repetition_end_date),
      (newInit.dayOfWeek = schedule.repetition.day_of_week);
  }

  if (schedule.label) {
    const newLabel = {
      category: 'MEMBER',
      id: schedule.label.label_id,
      title: schedule.label.title,
      color: schedule.label.color,
    };
    newInit.label = newLabel as Label;
  }

  return newInit;
}

function SkedDetailModal({
  isOpen,
  scheduleId,
  handleClose,
  setUpdateTrue
}: DetailModalProps) {
  const handlePut = async (state: Schedule & Repeat) => {
    await putSchedule(state);
  };
  const [isModify, setIsModify] = useState<boolean>(false);
  const [schedule, setSchedule] = useState<ScheduleResponse | null>(null);
  const { form, setForm, handleChange, handleSubmit } = useForm<
    Schedule & Repeat,
    void
  >(initialSchedule, handlePut);

  const handelConfirm = async () => {
    await handleSubmit();
    setUpdateTrue();
  }

  const setModifyTrue = () => {
    setIsModify(true);
  };

  const getSchedule = async () => {
    const response = await getScheduleDetail(scheduleId);
    if (response) {
      setSchedule(response);
    }
  };

  useEffect(() => {
    if (scheduleId) {
      getSchedule();
    }
  }, [scheduleId]);

  useEffect(() => {
    if (schedule) {
      setForm(createInit(schedule));
      console.log(createInit(schedule))
    }
  }, [schedule]);

  useEffect(() => {
  }, [form])

  return (
    <Modal
      isOpen={isOpen}
      handleClose={() => {
        setIsModify(false);
        handleClose();
      }}
      confirm={
        isModify ? { content: '저장', handleConfirm: handelConfirm } : undefined
      }
      title={<></>}
      contents={
        <SkedDetailPanel
          isModify={isModify}
          setModifyTrue={setModifyTrue}
          states={form}
          handleChange={handleChange}
          setStates={setForm}
          schedule={schedule}
          handleClose={handleClose}
        />
      }
    />
  );
}

export default SkedDetailModal;
