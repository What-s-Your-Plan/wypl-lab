import { axiosWithAccessToken } from '../axios';

const getReviewDetail = async (reviewId: string) => {
  const response = await axiosWithAccessToken.get(
    `/review/v1/reviews/detail/${reviewId}`,
  );
  return response.data.body;
};

export default getReviewDetail;
