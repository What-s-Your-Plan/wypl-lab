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
      confirm={{ content: '저장', handleConfirm: handleConfirm }}
      title={<></>}
<<<<<<< HEAD
      contents={
        <SkedDetailPanel scheduleId={scheduleId} handleClose = {handleClose}/>
      }
=======
      contents={<SkedDetailPanel scheduleId={scheduleId} />}
>>>>>>> 426c49efa716bb93f0b7e0e8c965c39beb7aa5ea
    />
  );
}

export default SkedDetailModal;
