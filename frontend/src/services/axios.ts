import Axios, { HttpStatusCode } from 'axios';

import useJsonWebTokensStore from '@/stores/TokenStore';
import reissueTokens from './auth/reissue';

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

let isTokenBeingReissued = false;
let tokenReissuePromise: Promise<void> | null = null;

const handleUnauthorizedError = async (error: any, axiosInstance: any) => {
  const refreshToken = useJsonWebTokensStore.getState().refreshToken;
  if (error.response.status === HttpStatusCode.Unauthorized && refreshToken) {
    if (!isTokenBeingReissued) {
      isTokenBeingReissued = true;
      tokenReissuePromise = (async () => {
        const params: ReissueTokenParams = {
          refresh_token: refreshToken,
        };
        const body = await reissueTokens(params);
        if (body !== null) {
          useJsonWebTokensStore.getState().setAccessToken(body.access_token);
          useJsonWebTokensStore.getState().setRefreshToken(body.refresh_token);
        } else {
          useJsonWebTokensStore.getState().resetTokens();
        }
        isTokenBeingReissued = false;
      })();
    }

    await tokenReissuePromise;

    if (useJsonWebTokensStore.getState().accessToken) {
      error.config.headers.Authorization = `Bearer ${useJsonWebTokensStore.getState().accessToken}`;
      return axiosInstance(error.config);
    }
  }
  if (error.response.status === HttpStatusCode.Forbidden) {
    useJsonWebTokensStore.getState().resetTokens();
  }
  return Promise.reject(error);
};

axiosWithAccessToken.interceptors.request.use((config) => {
  const accessToken = useJsonWebTokensStore.getState().accessToken;
  if (config.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

axiosWithAccessToken.interceptors.response.use(null, async function (error) {
  return handleUnauthorizedError(error, axiosWithAccessToken);
});

axiosWithMultiPart.interceptors.request.use((config) => {
  const accessToken = useJsonWebTokensStore.getState().accessToken;
  if (config.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

axiosWithMultiPart.interceptors.response.use(null, async function (error) {
  return handleUnauthorizedError(error, axiosWithMultiPart);
});

export { baseURL, axios, axiosWithAccessToken, axiosWithMultiPart };
