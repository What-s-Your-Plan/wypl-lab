import { Disclosure } from '@headlessui/react';
import GroupMemberList from './GroupMemberList';
import { Divider } from '../common/Divider';
import ColorCircle from '../common/ColorCircle';
import { BgColors } from '@/assets/styles/colorThemes';
import ChevronDown from '@/assets/icons/chevronDown.svg';
import Setting from '@/assets/icons/settings.svg';
import { useNavigate } from 'react-router-dom';

type GroupInfoProps = {
  group: Group;
};

function GroupInfo({ group }: GroupInfoProps) {
  const navigator = useNavigate();
  const handleOpenSettings = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    console.log('Open Settings');
  };
  return (
    <div onClick={() => navigator(`/group/${group.group_id}`)}>
      <Disclosure>
        <Disclosure.Button className="pt-2 pb-4 w-full border-none">
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <ColorCircle $bgColor={group.group_color as BgColors} />
              {group.name}
            </div>
            <div className="flex gap-4">
              <img src={ChevronDown} alt="펼치기" />
              {group.is_owner && (
                <img src={Setting} alt="설정" onClick={handleOpenSettings} />
              )}
            </div>
          </div>
        </Disclosure.Button>
        <Divider />
        <Disclosure.Panel>
          <GroupMemberList groupId={group.group_id} />
        </Disclosure.Panel>
      </Disclosure>
    </div>
  );
}

export default GroupInfo;
