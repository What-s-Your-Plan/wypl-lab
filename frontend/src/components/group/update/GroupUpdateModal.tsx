import { useState } from 'react';

import Modal from '@/components/common/Modal';
import GroupCreatePanel from '@/components/group/create/GroupCreatePanel';

import postGroupRegister, {
  GroupResponse as CreateGroup,
} from '@/services/group/postGroupRegister';
import { FindGroupResponse as MemberGroup } from '@/services/group/getMemberGroupList';

import useForm from '@/hooks/useForm';

import { LabelColorsType } from '@/assets/styles/colorThemes';

import * as S from '@/components/group/create/GroupCreateModal.styled';

type GroupUpdateModalProps = {
  isOpen: boolean;
  init: GroupUpdateInfo;
  handleClose: (() => void) | (() => Promise<void>);
  handleConfirm: (memberGroup: MemberGroup) => void;
};

function GroupUpdateModal({
  isOpen,
  init,
  handleClose,
  // handleConfirm,
}: GroupUpdateModalProps) {
  const { form, setForm, handleChange, handleSubmit } = useForm<
    GroupInfo,
    CreateGroup
  >(init, postGroupRegister);

  const handleConfirmClick = async () => {
    await handleSubmit();
    // handleConfirm();
  };

  const [color, setColor] = useState<LabelColorsType>('labelRed');
  const CreateGroupHeader = () => {
    return (
      <S.TitleContainer>
        <S.Title>그룹을 수정해보세요!</S.Title>
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

export default GroupUpdateModal;
