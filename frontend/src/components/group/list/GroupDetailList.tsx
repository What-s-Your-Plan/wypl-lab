import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';

import PopOver from '@/components/common/PopOver';
import Tooltip from '@/components/tooltip/Tooltip';
import PalettePanel from '@/components/color/PalettePanel';
import ColorCircle from '../../common/ColorCircle';
import { Divider } from '../../common/Divider';
import GroupUpdateModal from '../update/GroupUpdateModal';
import GroupMemberList from '../member/GroupMemberList';

import patchPersonalGroupColor from '@/services/group/patchGroupColor';

import { BgColors } from '@/assets/styles/colorThemes';
import ChevronDown from '@/assets/icons/chevronDown.svg';
import Setting from '@/assets/icons/settings.svg';

import * as S from './GroupDetailList.styled';

type GroupInfoProps = {
  group: Group;
  groupWithdrawEvent: (groupId: number) => void;
};

function GroupDetailList({ group, groupWithdrawEvent }: GroupInfoProps) {
  const navigate = useNavigate();
  const { groupId } = useParams();
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

  const [groupCreateInit] = useState<GroupUpdateInfo>({
    id: group.id,
    name: group.name,
    color: group.color,
    member_id_list: [],
  });

  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const closeModal = () => {
    setIsModalOpen(false);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  useEffect(() => {}, [isModalOpen]);

  const handleUpdateGroup = () => {};

  const groupDetail = (isOpen: boolean) => {
    return (
      <S.GroupContainer>
        <S.GroupWrapper onClick={() => gotoGroupPage(isOpen)}>
          <S.Box className="pl-6">{group.name}</S.Box>
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
        init={groupCreateInit}
        handleClose={closeModal}
        handleConfirm={handleUpdateGroup}
      />
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
          panel={<PalettePanel setColor={handleChangeColor} isRounded={true} />}
        />
      </S.PopOverWrapper>
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
                  groupWithdrawEvent={groupWithdrawEvent}
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
