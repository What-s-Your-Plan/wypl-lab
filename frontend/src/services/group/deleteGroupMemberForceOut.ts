import { API_PATH } from '@/constants/Path';
import { axiosWithAccessToken } from '../axios';

export type DeleteGroupMemberForceOutRequest = {
  member_id: number;
};

export type DeleteGroupMemberForceOutResponse = {
  member_id: number;
};

async function deleteGroupMemberForceOut(
  groupId: number,
  request: DeleteGroupMemberForceOutRequest,
) {
  return await axiosWithAccessToken
    .patch<
      BaseResponse<DeleteGroupMemberForceOutResponse>
    >(API_PATH.GROUP.FORCE_OUT.replace(':groupId', groupId.toString()), request)
    .then((res) => {
      return res.data.body!;
    });
}

export default deleteGroupMemberForceOut;
