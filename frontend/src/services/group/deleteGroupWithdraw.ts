import { axiosWithAccessToken } from '../axios';

import { API_PATH } from '@/constants/Path';

async function deleteGroupWithdraw(groupId: number) {
  return await axiosWithAccessToken.delete<BaseResponse<void>>(
    API_PATH.GROUP.WITHDRAW.replace(':groupId', groupId.toString()),
  );
}

export default deleteGroupWithdraw;
