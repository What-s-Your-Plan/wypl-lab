import { useNavigate } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';

import GroupMemberList from '../GroupMemberList';
import { Divider } from '../../common/Divider';
import ColorCircle from '../../common/ColorCircle';

import { BgColors } from '@/assets/styles/colorThemes';
import ChevronDown from '@/assets/icons/chevronDown.svg';
import Setting from '@/assets/icons/settings.svg';

import * as S from './GroupInfo.styled';

type GroupInfoProps = {
  group: Group;
};

function GroupInfo({ group }: GroupInfoProps) {
  const navigator = useNavigate();

  const handleOpenSettings = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  const groupDetail = (isOpen: boolean) => {
    return (
      <S.GroupWrapper>
        <S.Box className="flex gap-4">
          <ColorCircle
            $bgColor={group.color as BgColors}
            className="!rounded-lg"
          />
          {group.name}
        </S.Box>
        <S.Box className="flex gap-4">
          <img
            src={ChevronDown}
            alt="펼치기"
            className={isOpen ? 'rotate-180 transform w-6' : 'w-6'}
          />
          {group.is_owner && (
            <img
              src={Setting}
              alt="설정"
              onClick={handleOpenSettings}
              className="w-5"
            />
          )}
        </S.Box>
      </S.GroupWrapper>
    );
  };

  return (
    <S.Container onClick={() => navigator(`/group/${group.id}`)}>
      <Disclosure>
        {({ open }) => (
          <S.GroupContainer>
            <Disclosure.Button className="pt-2 pb-4 w-full border-none">
              {groupDetail(open)}
            </Disclosure.Button>
            <Divider />
            <Disclosure.Panel>
              <GroupMemberList groupId={group.id} />
            </Disclosure.Panel>
          </S.GroupContainer>
        )}
      </Disclosure>
    </S.Container>
  );
}

export default GroupInfo;
