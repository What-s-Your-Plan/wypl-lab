import { useEffect, useState } from 'react';

type GroupMemberProps = {
  groupId: number;
};

function GroupMemberList({ groupId }: GroupMemberProps) {
  const [memberList, setMemberList] = useState<GroupMember[]>([]);

  const fetchGroupMember = async () => {
    //TODO: api 호출
    console.log(groupId);
    setMemberList([
      {
        member_id: 1,
        oauth_id: 'jiwons0803@naver.com', //"jiwons0803@naver.com",
        nickname: '지롱이', //"지롱이"
        profile_image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN55lIKqWaNpSb2A66vQf9u9mY2t9n8P_YYJnPDRykMA&s',
        is_accepted: true,
      },
      {
        member_id: 2,
        oauth_id: 'jiwons0803@naver.com', //"jiwons0803@naver.com",
        nickname: '짜소연', //"지롱이"
        profile_image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN55lIKqWaNpSb2A66vQf9u9mY2t9n8P_YYJnPDRykMA&s',
        is_accepted: true,
      },
      {
        member_id: 2,
        oauth_id: 'jiwons0803@naver.com', //"jiwons0803@naver.com",
        nickname: '댬니', //"지롱이"
        profile_image:
          'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTN55lIKqWaNpSb2A66vQf9u9mY2t9n8P_YYJnPDRykMA&s',
        is_accepted: true,
      },
    ]);
  };

  const renderGroupMemberList = () => {
    return memberList.map((member) => {
      return (
        <div key={member.member_id} className="flex gap-4 items-center">
          <img
            src={member.profile_image}
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
