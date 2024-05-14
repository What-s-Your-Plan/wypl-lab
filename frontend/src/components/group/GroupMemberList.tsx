import getGroupMember from '@/services/group/getGroupMember';
import { useEffect, useState } from 'react';
import DefaultImage from '@/assets/icons/user.svg';

type GroupMemberProps = {
  groupId: number;
};

function GroupMemberList({ groupId }: GroupMemberProps) {
  const [memberList, setMemberList] = useState<GroupMember[]>([]);

  const fetchGroupMember = async () => {
    //TODO: api 호출
    const response = await getGroupMember(groupId);
    setMemberList(response);
  };

  const renderGroupMemberList = () => {
    return memberList.map((member) => {
      return (
        <div key={member.member_id} className="flex gap-4 items-center">
          <img
            src={
              member.profile_image_url ? member.profile_image_url : DefaultImage
            }
            alt={member.nickname}
            className="w-8 h-8 rounded-full"
          />
          <div>{member.nickname}</div>
        </div>
      );
    });
  };

  useEffect(() => {
    fetchGroupMember();
  }, []);
  return (
    <div className="flex flex-col gap-2 my-2">{renderGroupMemberList()}</div>
  );
}

export default GroupMemberList;
