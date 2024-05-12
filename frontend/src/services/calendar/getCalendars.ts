import { axiosWithAccessToken } from '@/services/axios';

async function getCalendars(type: 'DAY' | 'WEEK' | 'MONTH', date: string) {
  try {
    const response = await axiosWithAccessToken.get(`/calendar/v1/calendars/${type}`, {params: {date}});
    if (response.status === 200) {
      return response.data.body as Promise<CalendarsResponse>;
    } else if (response.status === 401) {
      console.log(401)
    } else if (response.status === 403) {
      console.log(403)
    }
  } catch (err) {
    console.log(err);
  }

}

export default getCalendars;
