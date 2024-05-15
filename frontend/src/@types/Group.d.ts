type Group = {
  id: number;
  name: string;
  color: string;
  is_owner: boolean;
};

type GroupMember = {
  member_id: number;
  oauth_id: string;
  nickname: string;
  profile_image: string;
  is_accepted: boolean;
};

type GroupInfo = {
  name: string;
  color: string;
  member_id_list: Array<number>;
};

type GroupUpdateInfo = {
  id: number;
  name: string;
  color: string;
};
