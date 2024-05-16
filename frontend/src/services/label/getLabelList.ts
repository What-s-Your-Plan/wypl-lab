import { axiosWithAccessToken } from '@/services/axios';

async function getLabelList() {
  const response = await axiosWithAccessToken.get('/label/v1/labels/main');
  console.log(response.data);
  return response.data.body.labels;
}

export default getLabelList;
