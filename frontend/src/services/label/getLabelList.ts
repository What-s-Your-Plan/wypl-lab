// import { axiosWithAccessToken } from '@/services/axios';

async function getLabelList() {
  // const response = await axiosWithAccessToken.get('/label/v1/labels');
  // console.log(response.data);
  // return response.data.labels;
  return [
    { label_id: 1, member_id: 1, title: '싸피', color: 'labelBlue' },
    { label_id: 2, member_id: 1, title: '프로젝트', color: 'labelGreen' },
    { label_id: 3, member_id: 1, title: '개인', color: 'labelRed' },
    { label_id: 4, member_id: 1, title: '스터디', color: 'labelYellow' },
  ];
}

export default getLabelList;
