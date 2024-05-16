import { axiosWithAccessToken } from '../axios';
import { API_PATH } from '@/constants/Path';
import { BgColors } from '@/assets/styles/colorThemes';

export type GroupResponse = {
  id: number;
  name: string;
  color: BgColors;
};

async function postGroupRegister(body: {
  name: string;
  member_id_list: Array<number>;
  color: string;
}) {
  return await axiosWithAccessToken
    .post<BaseResponse<GroupResponse>>(API_PATH.GROUP.BASE, body)
    .then((res) => {
      return res.data.body!;
    });
}

export default postGroupRegister;
