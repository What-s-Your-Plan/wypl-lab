import { axiosWithAccessToken } from '../axios';

async function patchGroupInvite(groupId: number) {
  return await axiosWithAccessToken.patch(
    `/group/v1/groups/${groupId}/members/invitation`,
  );
}

export default patchGroupInvite;
