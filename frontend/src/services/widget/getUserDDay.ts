import { axiosWithAccessToken } from '../axios';

async function getUserDDay(user_id: number) {
  const response = await axiosWithAccessToken.get(`/side/v1/d-day/${user_id}`);
  return response.data.body;
}

export default getUserDDay;
