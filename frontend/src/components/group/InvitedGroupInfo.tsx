import { useNavigate } from 'react-router-dom';

import { Divider } from '../common/Divider';
import ColorCircle from '../common/ColorCircle';
import { BgColors } from '@/assets/styles/colorThemes';
import Check from '@/assets/icons/check.svg';
import X from '@/assets/icons/x.svg';

type InvitedGroupInfoProps = {
  group: Group;
};

function InvitedGroupInfo({ group }: InvitedGroupInfoProps) {
  const navigator = useNavigate();
  const handleAccept = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    console.log('Open Settings');
  };

  const handleReject = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    console.log('Reject ');
  };
  return (
    <div onClick={() => navigator(`/group/${group.group_id}`)}>
      <div>
        <div className="pt-2 pb-4 w-full border-none">
          <div className="flex justify-between items-center">
            <div className="flex gap-4">
              <ColorCircle $bgColor={group.group_color as BgColors} />
              {group.name}
            </div>
            <div className="flex gap-4">
              <img src={Check} alt="펼치기" onClick={handleAccept} />
              <img src={X} alt="설정" onClick={handleReject} />
            </div>
          </div>
        </div>
        <Divider />
      </div>
    </div>
  );
}

export default InvitedGroupInfo;
