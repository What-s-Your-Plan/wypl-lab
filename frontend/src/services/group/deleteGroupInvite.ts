import { axiosWithAccessToken } from '../axios';
import { API_PATH } from '@/constants/Path';

async function deleteGroupInvite(groupId: number) {
  return await axiosWithAccessToken.delete(
    API_PATH.GROUP.INVITE.replace(':groupId', groupId.toString()),
  );
}

export default deleteGroupInvite;
