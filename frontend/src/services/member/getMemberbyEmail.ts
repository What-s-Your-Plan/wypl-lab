import { axiosWithAccessToken } from '../axios';

async function getMemberbyEmail(email: string, size: number) {
  const response = await axiosWithAccessToken.get(
    `/member/v1/members?q=${email}&size=${size}`,
  );
  return response.data.body.members;
}

export default getMemberbyEmail;
