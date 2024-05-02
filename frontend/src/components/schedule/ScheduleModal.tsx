import Modal from '@/components/common/Modal';
import useForm, { initialSchedule } from '@/hooks/useForm';
import SchedulePanel from '@/components/schedule/SchedulePanel';
import PostSchedule from '@/services/schedule/PostSchedule';

type Props = {
  isOpen: boolean;
  init?: Schedule & Repeat;
  handleClose: (() => void) | (() => Promise<void>);
  handleConfirm?: (() => void) | (() => Promise<void>);
};

function ScheduleModal({
  isOpen,
  init = { ...initialSchedule },
  handleClose,
  handleConfirm,
}: Props) {
  const { form, handleChange, setForm } = useForm<Schedule & Repeat>(
    init,
    PostSchedule,
  );
  return (
    <Modal
      isOpen={isOpen}
      cancel="취소"
      confirm="저장"
      title={<></>}
      contents={
        <SchedulePanel
          states={form}
          handleChange={handleChange}
          setStates={setForm}
        />
      }
      handleClose={handleClose}
      handleConfirm={handleConfirm}
    />
  );
}

export default ScheduleModal;
