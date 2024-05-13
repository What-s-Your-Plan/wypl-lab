import { useEffect, useState } from 'react';

import getMemberGroupList from '@/services/group/getMemberGroupList';

import { Container } from '../common/Container';
import { Divider } from '../common/Divider';
import Button from '../common/Button';
import InvitedGroupInfo from './InvitedGroupInfo';
import GroupInfo from './GroupInfo';

import Envelope from '@/assets/icons/envelope.svg';
import Users from '@/assets/icons/users.svg';
import Plus from '@/assets/icons/plus.svg';

function GroupList() {
  const [groupList, setGroupList] = useState<Group[]>([]);
  const [invitedGroupList, setInvitedGroupList] = useState<Group[]>([]);

  const handleGroupCreate = () => {
    console.log('새로운 그룹 생성');
  };

  const renderInvitedGroupList = () => {
    if (!invitedGroupList || invitedGroupList?.length === 0) {
      return <div>새로운 초대가 없어요</div>;
    }
    return invitedGroupList?.map((group) => {
      return <InvitedGroupInfo key={group.group_id} group={group} />;
    });
  };

  const renderGroupList = () => {
    if (!groupList || groupList?.length === 0) {
      return <div>속해있는 그룹이 없어요</div>;
    }
    return groupList?.map((group) => {
      return <GroupInfo key={group.group_id} group={group} />;
    });
  };

  const fetchGroupList = async () => {
    const response = await getMemberGroupList();
    setGroupList(response.groups);
    setInvitedGroupList(response.invited_groups);

    setInvitedGroupList([
      {
        group_id: 1,
        name: 'A602',
        group_color: 'labelRed',
        is_owner: true,
      },
      {
        group_id: 2,
        name: 'A602',
        group_color: 'labelRed',
        is_owner: true,
      },
    ]);
  };

  useEffect(() => {
    fetchGroupList();
  }, []);
  return (
    <Container $width="left" className="flex flex-col gap-4">
      <div>
        <div className="flex gap-2">
          <img src={Envelope} alt="초대" className="w-4" />
          초대받은 그룹
        </div>
        {renderInvitedGroupList()}
      </div>
      <Divider />
      <div className="scrollBar flex flex-col gap-2 h-[70%]">
        <div className="flex justify-between">
          <div className="flex gap-2">
            <img src={Users} alt="그룹" className="w-4" />
            <div>나의 그룹</div>
          </div>
          <Button
            className="!bg-transparent"
            $size="none"
            onClick={handleGroupCreate}
          >
            <img src={Plus} alt="그룹 생성" className="w-4" />
          </Button>
        </div>
        {renderGroupList()}
      </div>
    </Container>
  );
}

export default GroupList;
