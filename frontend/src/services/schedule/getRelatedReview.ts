import { axiosWithAccessToken } from '../axios';

async function getRelatedReview(scheduleId: number) {
  const response = await axiosWithAccessToken.get(
    `/review/v1/reviews/NEWEST/${scheduleId}`,
  );

  return response.data.body.reviews;
}

export default getRelatedReview;
