// import { axiosWithAccessToken } from '../axios';

const getNotification = async (lastId: string | undefined) => {
  // if (lastId !== undefined) {
  //   const response = await axiosWithAccessToken.get(
  //     `/notification/v1/notifications/${lastId}`,
  //   );
  //   console.log(response);
  //   console.log(lastId);
  // } else {
  //   const response = await axiosWithAccessToken.get(
  //     `/notification/v1/notifications`,
  //   );
  //   console.log(response);
  //   console.log(lastId);
  // }
  console.log(lastId);

  return {
    notification: [
      {
        id: '6',
        member_id: 2,
        message: '댬니님, 코테스터디 4회차 일정은 잘 마치셨나요?',
        is_read: false,
        is_acted: false,
        type_code: 'Review',
        target_id: 4,
      },
      {
        id: '5',
        member_id: 2,
        message: '싸피 A602 팀 그룹 초대가 왔어요.',
        is_read: false,
        is_acted: false,
        type_code: 'Group',
        target_id: 2,
      },
      {
        id: '4',
        member_id: 2,
        message: '댬니님, 코테스터디 3회차 일정은 잘 마치셨나요?',
        is_read: false,
        is_acted: true,
        type_code: 'Review',
        target_id: 3,
      },
      {
        id: '3',
        member_id: 2,
        message: '댬니님, 코테스터디 2회차 일정은 잘 마치셨나요?',
        is_read: false,
        is_acted: false,
        type_code: 'Review',
        target_id: 2,
      },
      {
        id: '2',
        member_id: 2,
        message: '싸피 A602 팀 그룹 초대가 왔어요.',
        is_read: false,
        is_acted: true,
        type_code: 'Group',
        target_id: 1,
      },
      {
        id: '1',
        member_id: 2,
        message: '댬니님, 코테스터디 1회차 일정은 잘 마치셨나요?',
        is_read: false,
        is_acted: false,
        type_code: 'Review',
        target_id: 1,
      },
    ],
    last_id: '1',
    has_next: false,
  };
};

export default getNotification;
