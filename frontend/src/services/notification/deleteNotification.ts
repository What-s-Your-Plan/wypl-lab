import { axiosWithAccessToken } from '../axios';

async function deleteNotification() {
  await axiosWithAccessToken.delete(`/notification/v1/notifications`);
  return;
}

export default deleteNotification;
