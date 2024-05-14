import { axiosWithAccessToken } from '../axios';

async function deleteGroupInvite(groupId: number) {
  return await axiosWithAccessToken.delete(
    `/group/v1/groups/${groupId}/members/invitation`,
  );
}

export default deleteGroupInvite;
