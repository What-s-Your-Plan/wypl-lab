package com.butter.wypl.group.service;

import com.butter.wypl.group.data.response.GroupDetailResponse;
import com.butter.wypl.group.data.response.GroupListByMemberIdResponse;

public interface GroupLoadService {

	GroupDetailResponse getDetailById(int memberId, int groupId);

	GroupListByMemberIdResponse getGroupListByMemberId(int memberId);

}
