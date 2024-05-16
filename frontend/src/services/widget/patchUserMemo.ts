import { axiosWithAccessToken } from '../axios';

async function patchUserMemo(user_id: number, memo: string) {
  const response = await axiosWithAccessToken.patch(
    `/side/v1/memo/${user_id}`,
    { memo: memo },
  );
  return response.data.body.memo;
}

export default patchUserMemo;
