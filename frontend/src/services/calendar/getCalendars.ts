// import { axiosWithAccessToken } from '@/services/axios';

type Params = {
  labelId?: number;
  date?: string; //'2024-04-17'
};

async function getCalendars(type: 'DAY' | 'WEEK' | 'MONTH', params?: Params) {
  console.log(type, params);
  // try {
  //   const response = await axiosWithAccessToken(`/calendar/v1/calendars/${type}`, {params: params});
  //   if (response.status === 200) {
  //     return response.data.body as Promise<CalendarsResponse>;
  //   } else if (response.status === 401) {
  //     console.log(401)
  //   } else if (response.status === 403) {
  //     console.log(403)
  //   }
  // } catch (err) {
  //   console.log(err);
  // }

  return {
    schedule_count: 5,
    schedules: [
      {
        schedule_id: 1,
        title: '테스트테스트',
        category: 'Member',
        start_date: '2024-05-01 T10:57:00',
        end_date: '2024-05-06 T10:57:00',
        label: {
          label_id: 1,
          title: '라벨',
          color: 'labelRed',
        },
        group: null,
      },
      {
        schedule_id: 2,
        title: '22222222',
        category: 'Member',
        start_date: '2024-05-04 T10:57:00',
        end_date: '2024-05-09 T10:57:00',
        label: {
          label_id: 1,
          title: '33',
          color: 'labelBlue',
        },
        group: null,
      },
    ],
  };
}

export default getCalendars;
