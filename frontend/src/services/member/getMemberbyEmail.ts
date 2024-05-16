import { axiosWithAccessToken } from '../axios';

export type FindMemberByEmailResponse = {
  members: FindMemberProfile[];
  member_count: number;
};

export type FindMemberProfile = {
  id: number;
  email: string;
  nickname: string;
  profile_image_url: string | null;
};

async function getMemberByEmail(email: string, size: number) {
  return await axiosWithAccessToken
    .get<
      BaseResponse<FindMemberByEmailResponse>
    >(`/member/v1/members?q=${email}&size=${size}`)
    .then((res) => {
      return res.data.body!;
    });
}

export default getMemberByEmail;
