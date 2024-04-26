import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface JsonWebTokens {
  accessToken: string | null;
  refreshToken: string | null;
  setAccessToken: (newAccessToken: string) => void;
  setRefreshToken: (newRefreshToken: string) => void;
}

const useJsonWebTokensStore = create<JsonWebTokens>()(
  persist(
    (set): JsonWebTokens => ({
      accessToken: null,
      refreshToken: null,
      setAccessToken: (newAccessToken: string) => {
        set(() => ({ accessToken: newAccessToken }));
      },
      setRefreshToken: (newRefreshToken: string) => {
        set(() => ({ refreshToken: newRefreshToken }));
      },
    }),
    {
      name: 'tokenStorage',
    },
  ),
);

export default useJsonWebTokensStore;
