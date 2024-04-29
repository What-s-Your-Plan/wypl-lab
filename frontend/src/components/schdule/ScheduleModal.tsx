import Modal from '@/components/common/Modal';
import useForm, { initialSchedule, Schedule, Repeat } from '@/hooks/useForm';

type Props = {
  isOpen: boolean;
  init?: Schedule & Repeat
  handleClose: (() => void) | (() => Promise<void>);
  handleConfirm?: (() => void) | (() => Promise<void>);
};

function ScheduleModal({ isOpen, init=initialSchedule, handleClose, handleConfirm }: Props) {
  const [schedule, errors, handleChange, handleSubmit] =
    useForm<Schedule & Repeat>(initialSchedule, async() => {});
  return (
    <Modal
      isOpen={isOpen}
      cancel="취소"
      confirm="저장"
      title={<></>}
      contents={<></>}
      handleClose={handleClose}
      handleConfirm={handleConfirm}
    />
  );
}

export default ScheduleModal;
