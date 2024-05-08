import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface JsonWebTokensState {
  accessToken: string | null;
  refreshToken: string | null;
  setAccessToken: (newAccessToken: string) => void;
  setRefreshToken: (newRefreshToken: string) => void;
}

const useJsonWebTokensStore = create<JsonWebTokensState>()(
  persist(
    (set): JsonWebTokensState => ({
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
