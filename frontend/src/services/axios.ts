import Axios, { HttpStatusCode } from 'axios';

import useJsonWebTokensStore from '@/stores/TokenStore';
import useToastStore from '@/stores/ToastStore';

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

axiosWithAccessToken.interceptors.request.use((config) => {
  const accessToken = useJsonWebTokensStore.getState().accessToken;
  if (config.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
});

axiosWithMultiPart.interceptors.request.use((config) => {
  const accessToken = useJsonWebTokensStore.getState().accessToken;
  if (config.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }
  return config;
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

const handle4xxError = async (error: any) => {
  const newToast: NewToastContent = {
    duration: 300,
    message: error.response.data.message,
    type: 'ERROR',
  };
  useToastStore.getState().addToast(newToast);
};

const handle5xxError = async () => {
  const newToast: NewToastContent = {
    duration: 300,
    message: '내부 서버 오류입니다.',
    type: 'ERROR',
  };
  useToastStore.getState().addToast(newToast);
};

axiosWithAccessToken.interceptors.response.use(null, async function (error) {
  if (
    error.response.status === HttpStatusCode.Unauthorized ||
    error.response.status === HttpStatusCode.Forbidden
  ) {
    return handleUnauthorizedError(error, axiosWithMultiPart);
  } else if (error.response.status >= 400 && error.response.status < 500) {
    handle4xxError(error);
  } else if (error.response.status >= 500 && error.response.status < 600) {
    handle5xxError();
  }
  return Promise.reject(error);
});

axiosWithMultiPart.interceptors.response.use(null, async function (error) {
  if (
    error.response.status === HttpStatusCode.Unauthorized ||
    error.response.status === HttpStatusCode.Forbidden
  ) {
    return handleUnauthorizedError(error, axiosWithMultiPart);
  } else if (error.response.status >= 400 && error.response.status < 500) {
    handle4xxError(error);
  } else if (error.response.status >= 500 && error.response.status < 600) {
    handle5xxError();
  }
  return Promise.reject(error);
});

export { baseURL, axios, axiosWithAccessToken, axiosWithMultiPart };
