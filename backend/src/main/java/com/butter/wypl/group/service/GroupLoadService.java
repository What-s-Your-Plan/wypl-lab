package com.butter.wypl.group.service;

import com.butter.wypl.group.data.response.GroupDetailResponse;

public interface GroupLoadService {

	GroupDetailResponse getDetailById(int userId, int groupId);

}
