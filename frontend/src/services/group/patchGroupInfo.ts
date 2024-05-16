import { BgColors } from '@/assets/styles/colorThemes';
import { axiosWithAccessToken } from '../axios';

import { API_PATH } from '@/constants/Path';

export type UpdateGroupInfoRequest = {
  name: string;
  color: BgColors;
};

export type UpdateGroupInfoResponse = {
  id: number;
  name: string;
  color: BgColors;
};

async function patchGroupInfo(
  groupId: number,
  request: UpdateGroupInfoRequest,
) {
  return await axiosWithAccessToken.patch<
    BaseResponse<UpdateGroupInfoResponse>
  >(API_PATH.GROUP.BASE + `/${groupId}`, request);
}

export default patchGroupInfo;
