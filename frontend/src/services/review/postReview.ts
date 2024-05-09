import { Content } from '@/objects/Content';
// import { axiosWithAccessToken } from '../axios';

const postReview = (body: {
  title: string;
  scheduleId: number;
  contents: Content[];
}) => {
  // const response = axiosWithAccessToken.post('/review/v1/reviews', body);
  // console.log(response);
  console.log(body);
  return {
    body: {
      review_id: 1,
    },
  };
};

export default postReview;
