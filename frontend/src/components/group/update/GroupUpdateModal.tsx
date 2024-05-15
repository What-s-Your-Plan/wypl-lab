import { useState } from 'react';

import Modal from '@/components/common/Modal';
import GroupUpdatePanel from './GroupUpdatePanel';

import { BgColors } from '@/assets/styles/colorThemes';

import * as S from '@/components/group/create/GroupCreateModal.styled';

type GroupUpdateModalProps = {
  isOpen: boolean;
  init: GroupUpdateInfo;
  groupUpdateEvent: (newName: string, newColor: BgColors) => void;
  handleClose: (() => void) | (() => Promise<void>);
};

function GroupUpdateModal({
  isOpen,
  init,
  handleClose,
  groupUpdateEvent,
}: GroupUpdateModalProps) {
  const [groupUpdateInfo, setGroupUpdateInfo] = useState<GroupUpdateInfo>(init);

  const handleGroupUpdateInfo = (newName: string, newColor: BgColors) => {
    setGroupUpdateInfo((prev) => {
      return {
        ...prev,
        name: newName,
        color: newColor,
      };
    });
  };

  const handleConfirmClick = async () => {
    await groupUpdateEvent(
      groupUpdateInfo.name,
      groupUpdateInfo.color as BgColors,
    );
  };

  const CreateGroupHeader = () => {
    return (
      <S.TitleContainer>
        <S.Title>그룹을 수정해보세요!</S.Title>
        <S.Bar $color={groupUpdateInfo.color as BgColors} />
      </S.TitleContainer>
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      cancel="취소"
      confirm={{
        content: '저장',
        handleConfirm: handleConfirmClick,
      }}
      title={CreateGroupHeader()}
      contents={
        <GroupUpdatePanel
          groupUpdateInfoEvent={handleGroupUpdateInfo}
          groupUpdateInfo={groupUpdateInfo}
        />
      }
      handleClose={handleClose}
    />
  );
}

export default GroupUpdateModal;
