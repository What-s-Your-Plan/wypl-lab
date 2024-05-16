import { axiosWithAccessToken } from '../axios';

async function getGroupCalendars(type: string, groupId: number, date: string) {
  try {
    const response = await axiosWithAccessToken.get(
      `/calendar/v1/calendars/${type}/${groupId}?date=${date}`,
    );
    if (response.status !== 200) {
      console.log(response);
      return response;
    }
    return response.data.body;
  } catch (err) {
    console.log(err);
  }
}

export default getGroupCalendars;
