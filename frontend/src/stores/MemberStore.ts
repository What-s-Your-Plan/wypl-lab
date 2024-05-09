import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type MemberState = {
  memberId: number | undefined;
  setMemberId: (newMemberId: number) => void;
};

const useMemberStore = create<MemberState>()(
  persist(
    (set): MemberState => ({
      memberId: undefined,
      setMemberId: (newMemberId: number) => {
        set(() => ({ memberId: newMemberId }));
      },
    }),
    {
      name: 'memberStorage',
    },
  ),
);

export default useMemberStore;
