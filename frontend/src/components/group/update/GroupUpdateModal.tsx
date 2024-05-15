import { useState } from 'react';

import Button from '@/components/common/Button';
import Modal from '@/components/common/Modal';
import GroupUpdatePanel from './GroupUpdatePanel';

import deleteGroup from '@/services/group/deleteGroup';

import useToastStore from '@/stores/ToastStore';

import { BgColors } from '@/assets/styles/colorThemes';

import * as S from './GroupUpdateModal.styled';

type GroupUpdateModalProps = {
  isOpen: boolean;
  init: GroupUpdateInfo;
  groupUpdateEvent: (
    newName: string,
    newColor: BgColors,
    memberIds: Array<number>,
  ) => void;
  groupDeleteEvent: (groupId: number) => void;
  handleClose: (() => void) | (() => Promise<void>);
};

function GroupUpdateModal({
  isOpen,
  init,
  handleClose,
  groupUpdateEvent,
  groupDeleteEvent,
}: GroupUpdateModalProps) {
  const { addToast } = useToastStore();
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

  const [inviteMemberIds, setInviteMemberIds] = useState<Array<number>>([]);
  const handleInviteMemberIds = async (newMemberIds: Array<number>) => {
    await setInviteMemberIds(newMemberIds);
  };

  const handleConfirmClick = async () => {
    await groupUpdateEvent(
      groupUpdateInfo.name,
      groupUpdateInfo.color as BgColors,
      inviteMemberIds,
    );
  };

  const handleDeleteGroup = async () => {
    confirm('그룹 삭제할 시 복구할 수 없습니다.');
    const groupId: number = groupUpdateInfo.id;
    await deleteGroup(groupId);
    groupDeleteEvent(groupId);
    handleClose();
    await addToast({
      duration: 300,
      message: '그룹을 삭제하였습니다.',
      type: 'NOTIFICATION',
    });
  };

  const CreateGroupHeader = () => {
    return (
      <S.Container>
        <S.Wrapper>
          <S.Title>그룹을 수정해보세요!</S.Title>
          <Button
            $size={'none'}
            $bgColor={'labelRed'}
            $textColor={'white'}
            $width={'100px'}
            className={'mb-4'}
            onClick={handleDeleteGroup}
          >
            그룹 삭제
          </Button>
        </S.Wrapper>
        <S.Bar $color={groupUpdateInfo.color as BgColors} />
      </S.Container>
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
          groupUpdateInfo={groupUpdateInfo}
          groupUpdateInfoEvent={handleGroupUpdateInfo}
          inviteMemberIdsEvent={handleInviteMemberIds}
        />
      }
      handleClose={handleClose}
    />
  );
}

export default GroupUpdateModal;
