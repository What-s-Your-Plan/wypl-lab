import { axiosWithAccessToken } from '../axios';

import { API_PATH } from '@/constants/Path';

async function patchGroupInviteAccepted(groupId: number) {
  return await axiosWithAccessToken.patch(
    API_PATH.GROUP.INVITE.replace(':groupId', groupId.toString()),
  );
}

export default patchGroupInviteAccepted;
