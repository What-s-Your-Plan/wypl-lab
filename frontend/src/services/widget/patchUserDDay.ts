import { axiosWithAccessToken } from '../axios';

async function patchUserDDay(user_id: number, title: string, dday: string) {
  const response = await axiosWithAccessToken.patch(
    `/side/v1/d-day/${user_id}`,
    {
      title: title,
      date: dday,
    },
  );
  return response.data.body;
}

export default patchUserDDay;
