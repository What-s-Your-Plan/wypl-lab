import { axiosWithAccessToken } from '../axios';

async function getReviewSchedule(scheduleId: number) {
  const response = await axiosWithAccessToken.get(
    `/schedule/v1/schedules/${scheduleId}`,
  );
  return response.data.body;
}

export default getReviewSchedule;
