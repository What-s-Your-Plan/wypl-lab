import { axiosWithAccessToken } from '../axios';

import { API_PATH } from '@/constants/Path';

async function deleteGroup(groupId: number) {
  await axiosWithAccessToken.delete(API_PATH.GROUP.BASE + `/${groupId}`);
}

export default deleteGroup;
