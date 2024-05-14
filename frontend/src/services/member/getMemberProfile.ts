import { FindMemberProfileResponse } from '@/@types/Member';
import { API_PATH } from '@/constants/Path';
import { axiosWithAccessToken } from '@/services/axios';

const getMemberProfile = (memberId: number) => {
  return axiosWithAccessToken
    .get<
      BaseResponse<FindMemberProfileResponse>
    >(API_PATH.MEMBER.BASE + `/${memberId}`)
    .then((res) => {
      return res.data.body!;
    });
};

export default getMemberProfile;
