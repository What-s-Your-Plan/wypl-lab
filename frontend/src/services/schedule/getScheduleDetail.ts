import { axiosWithAccessToken } from '../axios';

async function getScheduleDetail(scheduleId: number) {
  try {
    const response = await axiosWithAccessToken.get(
      `/schedule/v1/schedules/details/${scheduleId}`,
    );

    if (response.status === 200) {
      return response.data.body as Promise<ScheduleResponse>;
    } else {
      console.log(response)
    }
  } catch (err) {
    throw new Error(`${err}`);
  }
}

export default getScheduleDetail;