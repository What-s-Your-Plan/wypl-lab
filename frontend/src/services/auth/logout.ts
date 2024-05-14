import { axiosWithAccessToken } from '@/services/axios';

import { API_PATH } from '@/constants/Path';

const deleteJsonWebTokens = () => {
  return axiosWithAccessToken.delete<BaseResponse<void>>(API_PATH.AUTH.LOGOUT);
};

export default deleteJsonWebTokens;
