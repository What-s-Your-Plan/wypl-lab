package com.butter.wypl.review.domain;

import java.util.List;
import java.util.Map;

import org.springframework.data.mongodb.core.mapping.Document;

import com.butter.wypl.global.common.MongoBaseEntityWithDelete;

import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Getter;

@Document(collection = "review_contents")
@Builder
@Getter
public class ReviewContents extends MongoBaseEntityWithDelete {
	@Id
	@Column(name = "review_contents_id")
	@GeneratedValue(strategy = GenerationType.UUID)
	private String id;

	private List<Map<String, Object>> contents;

	public static ReviewContents from(List<Map<String, Object>> contents) {
		return ReviewContents.builder()
				.contents(contents)
				.build();
	}

	public void updateContents(List<Map<String, Object>> contents) {
		this.contents = contents;
	}
}
