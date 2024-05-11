import { axiosWithAccessToken } from '../axios';

async function getWeather() {
  const response = await axiosWithAccessToken.get(`/side/v1/weathers`);
  return response.data.body;
}

export default getWeather;
