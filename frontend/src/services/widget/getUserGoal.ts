import { axiosWithAccessToken } from '../axios';

async function getUserGoal(user_id: number) {
  const response = await axiosWithAccessToken.get(`/side/v1/goals/${user_id}`);
  return response.data.body.content;
}

export default getUserGoal;
