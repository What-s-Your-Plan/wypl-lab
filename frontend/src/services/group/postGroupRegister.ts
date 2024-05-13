import { axiosWithAccessToken } from '../axios';

async function postGroupRegister(body: {
  name: string;
  member_id_list: Array<number>;
  group_color: string;
}) {
  const response = await axiosWithAccessToken.post('/group/v1/groups', body);
  return response.data.body.group_id;
}

export default postGroupRegister;
