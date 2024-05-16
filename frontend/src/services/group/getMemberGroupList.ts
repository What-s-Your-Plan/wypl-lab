import { BgColors } from '@/assets/styles/colorThemes';
import { axiosWithAccessToken } from '../axios';
import { API_PATH } from '@/constants/Path';

export type FindMemberGroupsResponse = {
  group_count: number;
  invited_group_count: number;
  groups: FindGroupResponse[];
  invited_groups: FindGroupResponse[];
};

export type FindGroupResponse = {
  id: number;
  name: string;
  color: BgColors;
  is_owner: true;
};

async function getMemberGroupList() {
  return axiosWithAccessToken
    .get<BaseResponse<FindMemberGroupsResponse>>(API_PATH.GROUP.MEMBER)
    .then((res) => {
      return res.data.body!;
    });
}

export default getMemberGroupList;
