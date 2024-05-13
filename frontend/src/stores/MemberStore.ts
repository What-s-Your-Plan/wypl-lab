import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { FindMemberProfileResponse } from '@/@types/Member';
import { getMemberProfileImageOrDefault } from '@/utils/ImageUtils';

type MemberState = {
  memberId: number | undefined;
  profileImage: string;
  email: string | undefined;
  nickname: string | undefined;
  mainColor: string | undefined;
  setId: (newId: number) => void;
  setProfileImage: (newProfileImage: string | null) => void;
  setEmail: (newEmail: string) => void;
  setNickname: (newNickname: string) => void;
  setMainColor: (newMainColor: string) => void;
  setProfile: (profile: FindMemberProfileResponse) => void;
  resetMember: () => void;
};

const useMemberStore = create<MemberState>()(
  persist(
    (set): MemberState => ({
      memberId: undefined,
      profileImage: getMemberProfileImageOrDefault(null),
      email: undefined,
      nickname: undefined,
      mainColor: undefined,
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
      setMainColor: (newLabelColor: string) => {
        set(() => ({
          mainColor: newLabelColor,
        }));
      },
      setProfile: (profile: FindMemberProfileResponse) => {
        set(() => ({
          nickname: profile.nickname,
          email: profile.email,
          profileImage: getMemberProfileImageOrDefault(
            profile.profile_image_url,
          ),
          mainColor: profile.main_color,
        }));
      },
      resetMember: () => {
        set(() => ({
          memberId: undefined,
          profileImage: defaultImage,
          email: undefined,
          nickname: undefined,
          mainColor: undefined,
        }));
      },
    }),
    {
      name: 'memberStorage',
    },
  ),
);

export default useMemberStore;
