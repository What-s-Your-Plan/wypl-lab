import { axios } from '@/services/axios';

import { API_PATH } from '@/constants/Path';

const mockIssueTokens = (params: MockIssueTokenParams) => {
  return axios
    .post<
      BaseResponse<IssueTokenResponse>
    >(API_PATH.AUTH.MOCK_ISSUE_TOKENS, {}, { params })
    .then((res) => {
      return res.data.body;
    });
};

export default mockIssueTokens;
