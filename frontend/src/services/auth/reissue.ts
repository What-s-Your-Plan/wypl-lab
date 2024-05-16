import { axios } from '@/services/axios';

import { API_PATH } from '@/constants/Path';

const reissueTokens = (params: ReissueTokenParams) => {
  return axios
    .put<
      BaseResponse<IssueTokenResponse>
    >(API_PATH.AUTH.REISSUE, {}, { params })
    .then((res) => {
      return res.data.body!;
    });
};

export default reissueTokens;
