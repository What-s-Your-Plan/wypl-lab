import Axios from 'axios';

import useJsonWebTokensStore from '@/stores/TokenStore';

const baseURL = import.meta.env.VITE_BASE_URL;

const axios = Axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const axiosWithAccessToken = Axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

const axiosWithMultiPart = Axios.create({
  baseURL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

axiosWithAccessToken.interceptors.request.use((config) => {
  if (config.headers && useJsonWebTokensStore().accessToken) {
    config.headers.Authorization = `Bearer ${useJsonWebTokensStore().accessToken}`;
  }
  return config;
});

axiosWithMultiPart.interceptors.request.use((config) => {
  if (config.headers && useJsonWebTokensStore().accessToken) {
    config.headers.Authorization = `Bearer ${useJsonWebTokensStore().accessToken}`;
  }
  return config;
});

export { baseURL, axios, axiosWithAccessToken, axiosWithMultiPart };
