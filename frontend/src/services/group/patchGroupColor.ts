import { axiosWithAccessToken } from '../axios';

import { API_PATH } from '@/constants/Path';
import { BgColors } from '@/assets/styles/colorThemes';

type Request = {
  color: BgColors;
};

type Response = {
  color: BgColors;
};

async function patchPersonalGroupColor(groupId: number, color: BgColors) {
  const request: Request = {
    color,
  };
  return await axiosWithAccessToken
    .patch<
      BaseResponse<Response>
    >(API_PATH.GROUP.PERSONAL_COLOR.replace(':groupId', groupId.toString()), request)
    .then((res) => {
      return res.data.body!.color;
    });
}

export default patchPersonalGroupColor;
