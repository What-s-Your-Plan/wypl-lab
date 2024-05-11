import { axiosWithAccessToken } from '../axios';

async function getReviewList(
  viewType: string,
  lastReviewId: string | undefined,
) {
  const response = await axiosWithAccessToken.get(
    `/review/v1/reviews/${viewType}?lastReviewId=${lastReviewId}`,
  );
  return response.data.body;
}

export default getReviewList;
