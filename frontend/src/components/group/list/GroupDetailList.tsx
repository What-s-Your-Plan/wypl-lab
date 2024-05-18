import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';

import PopOver from '@/components/common/PopOver';
import Tooltip from '@/components/tooltip/Tooltip';
import PalettePanel from '@/components/color/PalettePanel';
import ColorCircle from '../../common/ColorCircle';
import { Divider } from '../../common/Divider';
import GroupUpdateModal from '../update/GroupUpdateModal';
import GroupMemberList from '../member/GroupMemberList';

import patchGroupInfo, {
  UpdateGroupInfoRequest,
} from '@/services/group/patchGroupInfo';
import postGroupInvite, {
  GroupInviteRequest,
} from '@/services/group/postGroupInvite';
import patchPersonalGroupColor from '@/services/group/patchGroupColor';

import useToastStore from '@/stores/ToastStore';

import { BgColors } from '@/assets/styles/colorThemes';
import ChevronDown from '@/assets/icons/chevronDown.svg';
import Setting from '@/assets/icons/settings.svg';

import * as S from './GroupDetailList.styled';

type GroupInfoProps = {
  group: Group;
  groupDeleteEvent: (groupId: number) => void;
  groupUpdateEvent: (updateGroup: GroupUpdateInfo) => void;
};

function GroupDetailList({
  group,
  groupDeleteEvent,
  groupUpdateEvent,
}: GroupInfoProps) {
  const navigate = useNavigate();
  const { groupId } = useParams();
  const { addToast } = useToastStore();
  const [color, setColor] = useState<BgColors>(group.color as BgColors);

  const handleChangeColor = async (color: BgColors) => {
    const updateColor: BgColors = await patchPersonalGroupColor(
      group.id,
      color,
    );
    setColor(updateColor);
  };

  const gotoGroupPage = (open: boolean) => {
    if (open || groupId === group.id.toString()) {
      return;
    }
    navigate(`/group/${group.id}`);
  };

  const [groupUpdateInit] = useState<GroupUpdateInfo>({
    id: group.id,
    name: group.name,
    color: group.color,
  });

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };

  const handleUpdateGroup = async (
    newName: string,
    newColor: BgColors,
    memberIds: Array<number>,
  ) => {
    if (newName !== group.name || newColor !== (group.color as BgColors)) {
      const request: UpdateGroupInfoRequest = {
        name: newName,
        color: newColor,
      };
      await patchGroupInfo(group.id, request).then((res) => {
        const body = res.data.body!;
        groupUpdateEvent({
          id: group.id,
          name: body.name,
          color: body.color,
        });
      });
      addToast({
        duration: 300,
        message: `그룹 수정에 성공하였습니다.`,
        type: 'NOTIFICATION',
      });
    }
    console.log(memberIds);
    if (memberIds.length > 0) {
      const request: GroupInviteRequest = {
        member_id_list: memberIds,
      };
      await postGroupInvite(group.id, request);
      addToast({
        duration: 300,
        message: `그룹에 ${memberIds.length}명을 초대했습니다.`,
        type: 'NOTIFICATION',
      });
    }
  };

  const groupDetail = (isOpen: boolean) => {
    return (
      <S.GroupContainer>
        <S.GroupWrapper onClick={() => gotoGroupPage(isOpen)}>
          <S.Box className="flex gap-4 items-center">
            <S.PopOverWrapper>
              <PopOver
                panelPosition="bottom-8"
                button={
                  <ColorCircle
                    as="button"
                    $bgColor={color as BgColors}
                    $cursor="pointer"
                    className="!rounded-md"
                  />
                }
                panel={
                  <PalettePanel setColor={handleChangeColor} isRounded={true} />
                }
              />
            </S.PopOverWrapper>
            {group.name}
          </S.Box>
          <S.Box className="gap-4">
            {group.is_owner && (
              <Tooltip
                children={
                  <img
                    src={Setting}
                    alt="설정"
                    onClick={(e) => {
                      e.stopPropagation();
                      openModal();
                    }}
                    className="w-5"
                  />
                }
                text={'그룹 설정'}
              />
            )}
            <img
              src={ChevronDown}
              alt="펼치기"
              className={isOpen ? 'rotate-180 transform w-6' : 'w-6'}
            />
          </S.Box>
        </S.GroupWrapper>
      </S.GroupContainer>
    );
  };

  return (
    <S.Container>
      <GroupUpdateModal
        isOpen={isModalOpen}
        init={groupUpdateInit}
        handleClose={closeModal}
        groupUpdateEvent={handleUpdateGroup}
        groupDeleteEvent={groupDeleteEvent}
      />
      <div>
        <Disclosure>
          {({ open }) => (
            <S.Wrapper>
              <Disclosure.Button className="pt-2 pb-4 w-full border-none">
                {groupDetail(open)}
              </Disclosure.Button>
              <Divider />
              <Disclosure.Panel>
                <GroupMemberList
                  groupId={group.id}
                  color={color}
                  isOwner={group.is_owner}
                  groupDeleteEvent={groupDeleteEvent}
                />
              </Disclosure.Panel>
            </S.Wrapper>
          )}
        </Disclosure>
      </div>
    </S.Container>
  );
}

export default GroupDetailList;
