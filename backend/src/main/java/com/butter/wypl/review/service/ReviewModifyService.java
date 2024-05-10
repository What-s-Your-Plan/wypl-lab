package com.butter.wypl.review.service;

import org.springframework.transaction.annotation.Transactional;

import com.butter.wypl.review.data.request.ReviewCreateRequest;
import com.butter.wypl.review.data.request.ReviewUpdateRequest;
import com.butter.wypl.review.data.response.ReviewIdResponse;

public interface ReviewModifyService {
	@Transactional
	ReviewIdResponse createReview(int memberId, int scheduleId, ReviewCreateRequest reviewCreateRequest);

	@Transactional
	ReviewIdResponse updateReview(int memberId, ReviewUpdateRequest reviewUpdateRequest);

	@Transactional
	ReviewIdResponse deleteReview(int memberId, int reviewId);
}
