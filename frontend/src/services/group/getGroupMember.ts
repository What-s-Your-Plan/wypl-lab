import { API_PATH } from '@/constants/Path';
import { axiosWithAccessToken } from '../axios';
import { BgColors } from '@/assets/styles/colorThemes';

export type FindGroupMembersResponse = {
  color: BgColors;
  member_count: number;
  members: GroupMemberResponse[];
};

export type GroupMemberResponse = {
  profile_image: string | null;
  is_accepted: boolean;
  id: number;
  email: string;
  nickname: string;
};

async function getGroupMember(groupId: number) {
  return axiosWithAccessToken
    .get<
      BaseResponse<FindGroupMembersResponse>
    >(API_PATH.GROUP.BASE + `/${groupId}`)
    .then((res) => {
      return res.data.body!;
    });
}

export default getGroupMember;
