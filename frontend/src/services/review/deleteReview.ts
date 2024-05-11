import { axiosWithAccessToken } from '../axios';

async function deleteReview(review_id: string) {
  const response = await axiosWithAccessToken.delete(
    `/review/v1/reviews/${review_id}`,
  );
  console.log(response);
  return;
}

export default deleteReview;
