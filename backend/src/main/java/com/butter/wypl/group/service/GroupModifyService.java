package com.butter.wypl.group.service;

import com.butter.wypl.group.data.request.GroupCreateRequest;

public interface GroupModifyService {

	int createGroup(int memberId, GroupCreateRequest createRequest);

}
