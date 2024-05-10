// import { axiosWithAccessToken } from '../axios';

const getReviewDetail = async (reviewId: string) => {
  // const response = await axiosWithAccessToken.get(
  //   `/review/v1/reviews/${reviewId}`,
  // );
  // return response.data.body;
  console.log(reviewId);
  return {
    review_id: 1,
    created_at: '2024-04-22T12:44:00',
    title: '회고 제목', //회고 제목
    schedule: {
      schedule_id: 1,
      title: '일정제목',
      start_date: '2024-04-16T15:00:00',
      end_date: '2024-04-16T17:00:00',
      category: 'Member',
      group_id: 1,
      label: {
        label_id: 1,
        member_id: 1,
        title: '제목', //라벨 제목
        color: 'labelYellow',
      },
      member_count: 1,
      members: [
        {
          member_id: 1,
          nickname: '다민',
          profile_image:
            'https://cdn.it.chosun.com/news/photo/201809/2018090100592_1.jpg',
        },
      ],
    },
    contents: [
      {
        blockType: 'text',
        text: '오늘도 재미있는 하루였다!\n 흠\n 줄바꿈',
      },
      {
        blockType: 'picture',
        path: 'https://cdn.it.chosun.com/news/photo/201809/2018090100592_1.jpg',
      },
      {
        blockType: 'emotion',
        emoji: '/src/assets/icons/emoji/nyah.svg',
        description: '아이 신나',
      },
      {
        blockType: 'weather',
        weather: '/src/assets/icons/weather/sun.svg',
        description: '오늘 날씨 짱조음',
      },
      {
        blockType: 'kpt',
        keepStr: 'keep',
        problemStr: 'problem',
        tryStr: 'try',
      },
      {
        blockType: '4f',
        facts: 'facts',
        feeling: 'feeling',
        finding: 'finding',
        future: 'future action',
      },
    ],
  };
};

export default getReviewDetail;
