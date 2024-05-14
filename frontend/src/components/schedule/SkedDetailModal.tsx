import Modal from '../common/Modal';
import SkedDetailPanel from './SkedDetailPanel';

type DetailModalProps = {
  isOpen: boolean;
  scheduleId: number;
  handleClose: (() => void) | (() => Promise<void>);
  handleConfirm: (() => void) | (() => Promise<void>);
};

function SkedDetailModal({
  isOpen,
  scheduleId,
  handleClose,
  handleConfirm,
}: DetailModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      handleClose={handleClose}
      confirm={{ content: '저장', handleConfirm:handleConfirm}}
      title={<></>}
      contents={
        <SkedDetailPanel scheduleId={scheduleId} />
      }
    />
  );
}

export default SkedDetailModal;
