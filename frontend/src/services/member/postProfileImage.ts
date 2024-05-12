import { UpdateProfileImageResponse } from '@/@types/Member';
import { API_PATH } from '@/constants/Path';
import { axiosWithMultiPart } from '@/services/axios';

const postProfileImage = (formData: FormData) => {
  return axiosWithMultiPart
    .post<
      BaseResponse<UpdateProfileImageResponse>
    >(API_PATH.MEMBER.PROFILE_IMAGE, formData)
    .then((res) => {
      return res.data.body!;
    });
};

export default postProfileImage;
