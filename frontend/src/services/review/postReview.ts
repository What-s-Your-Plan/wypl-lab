import { Content } from '@/objects/Content';
import { axiosWithAccessToken } from '../axios';

async function postReview(body: {
  title: string;
  schedule_id: number;
  contents: Content[];
}): Promise<number> {
  const response = await axiosWithAccessToken.post('/review/v1/reviews', body);
  console.log(response);
  return response.data.body.review_id;
}

export default postReview;
