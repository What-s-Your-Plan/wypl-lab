const accessToken: string = 'accessToken';
const accessTokenProvider = {
  get: () => {
    return localStorage.getItem(accessToken) ?? '';
  },
  remove: () => {
    localStorage.removeItem(accessToken);
  },
};

const refreshToken: string = 'refreshToken';
const refreshTokenProvider = {
  get: () => {
    return localStorage.getItem(refreshToken) ?? '';
  },
  remove: () => {
    localStorage.removeItem(refreshToken);
  },
};

export { accessTokenProvider, refreshTokenProvider };
