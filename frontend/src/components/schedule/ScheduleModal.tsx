import Modal from '@/components/common/Modal';
import useForm from '@/hooks/useForm';
import initialSchedule from '@/constants/ScheduleFormInit';
import SchedulePanel from '@/components/schedule/SchedulePanel';
import PostSchedule from '@/services/schedule/PostSchedule';

type ScheduleModalProps = {
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
}: ScheduleModalProps) {
  const { form, setForm, handleChange } = useForm<Schedule & Repeat>(
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
