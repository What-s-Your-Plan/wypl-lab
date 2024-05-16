import { Content } from '@/objects/Content';
import { axiosWithAccessToken } from '../axios';

async function patchReview(
  review_id: number,
  body: {
    title: string;
    schedule_id: number;
    contents: Content[];
  },
): Promise<number> {
  const response = await axiosWithAccessToken.patch(
    `/review/v1/reviews/${review_id}`,
    body,
  );
  console.log(response);
  return response.data.body.review_id;
}

export default patchReview;
