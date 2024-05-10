import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { getMemberProfileImageOrDefault } from '@/utils/ImageUtils';

type MemberState = {
  memberId: number | undefined;
  profileImage: string;
  email: string | undefined;
  nickname: string | undefined;
  setId: (newId: number) => void;
  setProfileImage: (newProfileImage: string | null) => void;
  setEmail: (newEmail: string) => void;
  setNickname: (newNickname: string) => void;
};

const useMemberStore = create<MemberState>()(
  persist(
    (set): MemberState => ({
      memberId: undefined,
      profileImage: getMemberProfileImageOrDefault(null),
      email: 'workju1124@gmail.com',
      // email: undefined,
      nickname: '김세이',
      // nickname: undefined,
      setId: (newMemberId: number) => {
        set(() => ({ memberId: newMemberId }));
      },
      setProfileImage: (newProfileImage: string | null) => {
        set(() => ({
          profileImage: getMemberProfileImageOrDefault(newProfileImage),
        }));
      },
      setEmail: (newEmail: string) => {
        set(() => ({
          email: newEmail,
        }));
      },
      setNickname: (newNickname: string) => {
        set(() => ({
          nickname: newNickname,
        }));
      },
    }),
    {
      name: 'memberStorage',
    },
  ),
);

export default useMemberStore;
