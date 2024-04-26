import { create } from 'zustand';

type JsonWebTokens = {
  accessToken: string | null;
  refreshToken: string | null;
};

const useJsonWebTokensStore = create<JsonWebTokens>((set) => ({
  accessToken: localStorage.getItem('accessToken'),
  refreshToken: localStorage.getItem('refreshToken'),
  setAccessToken: (newAccessToken: string) =>
    set({ accessToken: newAccessToken }),
  updateAccessToken: (newRefreshToken: string) =>
    set({ refreshToken: newRefreshToken }),
}));

export { useJsonWebTokensStore };
