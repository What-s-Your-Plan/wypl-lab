import { axiosWithAccessToken } from '../axios';

async function deleteNotification() {
  return await axiosWithAccessToken.delete(`/notification/v1/notifications`);
}

export default deleteNotification;
