type Group = {
  group_id: number;
  name: string;
  group_color: string;
  is_owner: boolean;
};

type GroupMember = {
  member_id: number;
  oauth_id: string; //"jiwons0803@naver.com",
  nickname: string; //"지롱이"
  profile_image: string;
  is_accepted: boolean;
};
