package com.butter.wypl.group.service;

import com.butter.wypl.group.data.request.GroupCreateRequest;
import com.butter.wypl.group.data.request.GroupUpdateRequest;
import com.butter.wypl.group.data.response.GroupIdResponse;

public interface GroupModifyService {

	GroupIdResponse createGroup(int memberId, GroupCreateRequest createRequest);

	void updateGroup(int memberId, int groupId, GroupUpdateRequest updateRequest);

	void deleteGroup(int memberId, int groupId);

}
