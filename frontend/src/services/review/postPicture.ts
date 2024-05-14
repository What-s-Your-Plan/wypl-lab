import { axiosWithMultiPart } from '../axios';

async function postPicture(formData: FormData) {
  return axiosWithMultiPart.post(`/file/v1/images`, formData).then((res) => {
    return res.data.body.image_url;
  });
}

export default postPicture;
