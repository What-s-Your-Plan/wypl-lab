import { axiosWithAccessToken } from '../axios';

const getNotification = async (lastId: string | undefined) => {
  let response;
  if (lastId !== undefined) {
    response = await axiosWithAccessToken.get(
      `/notification/v1/notifications?lastId=${lastId}`,
    );
  } else {
    response = await axiosWithAccessToken.get(`/notification/v1/notifications`);
  }

  const res = {
    notification: response.data.body.notifications,
    last_id: response.data.body.last_id,
    has_next: response.data.body.has_next,
    page_size: response.data.body.page_size,
  };

  return res;
};

export default getNotification;
