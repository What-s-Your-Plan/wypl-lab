import { axiosWithAccessToken } from '../axios';

async function getGroupMember(groupId: number) {
  const response = await axiosWithAccessToken.get(
    `/group/v1/groups/${groupId}`,
  );
  return response.data.body.members;
}

export default getGroupMember;
