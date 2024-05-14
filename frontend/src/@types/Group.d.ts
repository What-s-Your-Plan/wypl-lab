type Group = {
  id: number;
  name: string;
  color: string;
  is_owner: boolean;
};

type GroupMember = {
  member_id: number;
  oauth_id: string; //"jiwons0803@naver.com",
  nickname: string; //"지롱이"
  profile_image_url: string;
  is_accepted: boolean;
};

type GroupInfo = {
  name: string;
  color: string;
  member_id_list: Array<number>;
};
