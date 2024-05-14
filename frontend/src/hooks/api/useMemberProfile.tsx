import { useState } from 'react';

import getMemberProfile from '@/services/member/getMemberProfile';
import useMemberStore from '@/stores/MemberStore';

export default function useMemberProfile() {
  const [isLoading, setLoading] = useState<boolean>(false);
  const { setProfile } = useMemberStore();

  const requestMemberProfile = async (memberId: number) => {
    if (isLoading) {
      return;
    }
    setLoading(true);
    await getMemberProfile(memberId)
      .then((res) => {
        setProfile(res);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { isLoading, requestMemberProfile };
}
