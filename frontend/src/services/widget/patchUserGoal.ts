import { axiosWithAccessToken } from '../axios';

async function patchUserGoal(user_id: number, content: string) {
  const response = await axiosWithAccessToken.patch(
    `/side/v1/goals/${user_id}`,
    { content: content },
  );
  return response.data.body.content;
}

export default patchUserGoal;
