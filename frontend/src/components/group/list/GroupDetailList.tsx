import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';

import ColorCircle from '../../common/ColorCircle';
import { Divider } from '../../common/Divider';
import GroupMemberList from '../member/GroupMemberList';
import PalettePanel from '@/components/color/PalettePanel';
import PopOver from '@/components/common/PopOver';
import Tooltip from '@/components/tooltip/Tooltip';

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

  const handleOpenSettings = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const gotoGroupPage = (open: boolean) => {
    if (open || groupId === group.id.toString()) {
      return;
    }
    navigate(`/group/${group.id}`);
  };

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
                    onClick={handleOpenSettings}
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
