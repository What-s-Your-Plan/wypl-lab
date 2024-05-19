package com.butter.wypl.review.domain;

import org.hibernate.annotations.SQLRestriction;

import com.butter.wypl.global.common.BaseEntity;
import com.butter.wypl.review.exception.ReviewErrorCode;
import com.butter.wypl.review.exception.ReviewException;
import com.butter.wypl.schedule.domain.MemberSchedule;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
@SQLRestriction("deleted_at is null")
public class Review extends BaseEntity {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "review_id")
	private int reviewId;

	@Column(nullable = false, length = 50)
	private String title;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "member_schedule_id")
	private MemberSchedule memberSchedule;

	@Column(name = "review_contents_id", length = 100)
	private String reviewContentsId;

	@Builder
	public Review(int reviewId, String title, MemberSchedule memberSchedule, String reviewContentsId) {
		validateTitle(title);
		this.reviewId = reviewId;
		this.title = title;
		this.memberSchedule = memberSchedule;
		this.reviewContentsId = reviewContentsId;
	}

	public static Review of(String reviewContentsId, String title, MemberSchedule memberSchedule) {
		return Review.builder()
				.title(title)
				.reviewContentsId(reviewContentsId)
				.memberSchedule(memberSchedule)
				.build();
	}

	public void updateTitle(String title) {
		validateTitle(title);

		this.title = title;
	}

	public int getMemberId() {
		return memberSchedule.getMember().getId();
	}

	public void validationOwnerByMemberId(int memberId) {
		if (getMemberId() != memberId) {
			throw new ReviewException(ReviewErrorCode.NOT_PERMISSION_TO_REVIEW);
		}
	}

	private void validateTitle(String title) {
		if (title == null || title.length() > 30 || title.isEmpty()) {
			throw new ReviewException(ReviewErrorCode.NOT_APPROPRIATE_TITLE);
		}
	}
}
