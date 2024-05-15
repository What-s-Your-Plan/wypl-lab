import { useState } from 'react';

import Modal from '@/components/common/Modal';
import GroupCreatePanel from '@/components/group/create/GroupCreatePanel';

import postGroupRegister from '@/services/group/postGroupRegister';

import useForm from '@/hooks/useForm';

import { LabelColorsType } from '@/assets/styles/colorThemes';

import * as S from '@/components/group/create/GroupCreateModal.styled';

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

  const [color, setColor] = useState<LabelColorsType>('labelRed');
  const CreateGroupHeader = () => {
    return (
      <S.TitleContainer>
        <S.Title>새로운 그룹을 생성해보세요!</S.Title>
        <S.Bar $color={color} />
      </S.TitleContainer>
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      cancel="취소"
      confirm={{ content: '저장', handleConfirm: handleConfirmClick }}
      title={CreateGroupHeader()}
      contents={
        <GroupCreatePanel
          color={color}
          setColor={setColor}
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
