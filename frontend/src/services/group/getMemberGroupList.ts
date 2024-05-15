import { axiosWithAccessToken } from '../axios';

async function getMemberGroupList() {
  const response = await axiosWithAccessToken.get('/group/v1/groups/members');
  return response.data.body;
}

export default getMemberGroupList;
