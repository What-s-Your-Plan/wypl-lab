import { axiosWithAccessToken } from '@/services/axios';

import { API_PATH } from '@/constants/Path';

const getMemberColor = () => {
  return axiosWithAccessToken
    .get<BaseResponse<FindMemberColorResponse>>(API_PATH.MEMBER.COLOR)
    .then((res) => {
      return res.data.body!;
    });
};

export default getMemberColor;
