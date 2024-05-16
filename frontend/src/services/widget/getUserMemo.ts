import { axiosWithAccessToken } from '../axios';

async function getUserMemo(user_id: number) {
  const response = await axiosWithAccessToken.get(`/side/v1/memo/${user_id}`);
  return response.data.body.memo;
}

export default getUserMemo;
