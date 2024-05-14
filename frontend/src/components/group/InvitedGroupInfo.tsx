import { Divider } from '../common/Divider';
import ColorCircle from '../common/ColorCircle';

import styled from 'styled-components';
import { BgColors } from '@/assets/styles/colorThemes';
import Check from '@/assets/icons/check.svg';
import X from '@/assets/icons/x.svg';
import patchGroupInvite from '@/services/group/patchGroupInvite';
import deleteGroupInvite from '@/services/group/deleteGroupInvite';

type InvitedGroupInfoProps = {
  group: Group;
  fetchList: () => void;
};

function InvitedGroupInfo({ group, fetchList }: InvitedGroupInfoProps) {
  const handleAccept = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    patchGroupInvite(group.id);
    fetchList();
    window.location.reload();
  };

  const handleReject = (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (window.confirm('그룹 초대를 거절하시겠습니까?')) {
      deleteGroupInvite(group.id);
    }
    fetchList();
  };

  return (
    <div>
      <Divider />
      <div className="pt-2 pb-4 w-full border-none">
        <div className="flex justify-between items-center">
          <div className="flex gap-4">
            <ColorCircle
              $bgColor={group.color as BgColors}
              className="!rounded-lg"
            />
            {group.name}
          </div>
          <div className="flex gap-4">
            <GreenImg
              src={Check}
              alt="수락"
              onClick={handleAccept}
              className="cursor-pointer"
            />
            <RedImg
              src={X}
              alt="거부"
              onClick={handleReject}
              className="cursor-pointer"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const GreenImg = styled.img`
  filter: brightness(0) saturate(100%) invert(61%) sepia(99%) saturate(355%)
    hue-rotate(55deg) brightness(91%) contrast(87%);
`;

const RedImg = styled.img`
  filter: brightness(0) saturate(100%) invert(58%) sepia(92%) saturate(4683%)
    hue-rotate(335deg) brightness(109%) contrast(90%);
`;

export default InvitedGroupInfo;
