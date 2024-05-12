import {
  UpdateLabelColorRequest,
  UpdateLabelColorResponse,
} from '@/@types/Member';
import { axiosWithAccessToken } from '@/services/axios';

import { API_PATH } from '@/constants/Path';

const patchMemberLabelColor = (request: UpdateLabelColorRequest) => {
  return axiosWithAccessToken
    .patch<
      BaseResponse<UpdateLabelColorResponse>
    >(API_PATH.MEMBER.COLOR, request)
    .then((res) => {
      return res.data.body!;
    });
};

export default patchMemberLabelColor;
