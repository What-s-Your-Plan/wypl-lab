import postGroupRegister from '@/services/group/postGroupRegister';
import Modal from '@/components/common/Modal';
import useForm from '@/hooks/useForm';
import GroupCreatePanel from '@/components/group/GroupCreatePanel';

type GroupCreateModalProps = {
  isOpen: boolean;
  init: GroupInfo;
  handleClose: (() => void) | (() => Promise<void>);
  handleConfirm: (() => void) | (() => Promise<void>);
};

function GroupCreateModal({
  isOpen,
  init,
  handleClose,
  handleConfirm,
}: GroupCreateModalProps) {
  const { form, setForm, handleChange, handleSubmit } = useForm<GroupInfo>(
    init,
    postGroupRegister,
  );

  const handleConfirmClick = async () => {
    await handleSubmit();
    handleConfirm();
  };

  return (
    <Modal
      isOpen={isOpen}
      cancel="취소"
      confirm={{ content: '저장', handleConfirm: handleConfirmClick }}
      title={<></>}
      contents={
        <GroupCreatePanel
          states={form}
          handleChange={handleChange}
          setStates={setForm}
        />
      }
      handleClose={handleClose}
    />
  );
}

export default GroupCreateModal;
