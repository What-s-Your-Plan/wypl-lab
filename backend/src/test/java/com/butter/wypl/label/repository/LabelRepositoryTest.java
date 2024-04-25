package com.butter.wypl.label.repository;

import static org.assertj.core.api.Assertions.*;

import java.time.LocalDateTime;
import java.util.List;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.butter.wypl.global.annotation.JpaRepositoryTest;
import com.butter.wypl.label.domain.Label;
import com.butter.wypl.label.fixture.LabelFixture;


@JpaRepositoryTest
public class LabelRepositoryTest {

	private final LabelRepository labelRepository;

	@Autowired
	public LabelRepositoryTest(LabelRepository labelRepository) {
		this.labelRepository = labelRepository;
	}

	@Test
	@DisplayName("라벨이 정상적으로 등록된다.")
	void createLabel(){
		//given
		Label newLabel = LabelFixture.EXERCISE_LABEL.toLabel();

		//when
		Label savedLabel = labelRepository.save(newLabel);

		//then
		assertThat(savedLabel).isNotNull();
		assertThat(savedLabel.getLabelId()).isGreaterThan(0);
		assertThat(savedLabel.getTitle()).isEqualTo(newLabel.getTitle());
		assertThat(savedLabel.getColor()).isEqualTo(newLabel.getColor());
		assertThat(savedLabel.getMemberId()).isEqualTo(newLabel.getMemberId());
		assertThat(savedLabel.getCreatedAt()).isBefore(LocalDateTime.now());
		assertThat(savedLabel.getModifiedAt()).isEqualTo(savedLabel.getCreatedAt());
		assertThat(savedLabel.getDeletedAt()).isNull();
	}

	@Test
	@DisplayName("라벨 id로 라벨이 정상적으로 조회되는지 확인")
	void findLabelByLabelId(){
		//given
		Label newLabel = LabelFixture.EXERCISE_LABEL.toLabel();
		Label savedLabel = labelRepository.save(newLabel);

		//when
		Label findLabel = labelRepository.findByLabelId(savedLabel.getLabelId());

		//then
		assertThat(findLabel).isNotNull();
		assertThat(findLabel.getLabelId()).isEqualTo(savedLabel.getLabelId());
		assertThat(findLabel.getTitle()).isEqualTo(savedLabel.getTitle());
		assertThat(findLabel.getColor()).isEqualTo(savedLabel.getColor());
		assertThat(findLabel.getMemberId()).isEqualTo(savedLabel.getMemberId());
		assertThat(findLabel.getCreatedAt()).isEqualTo(savedLabel.getCreatedAt());
		assertThat(findLabel.getDeletedAt()).isNull();
	}

	@Test
	@DisplayName("회원별 라벨이 정상적으로 조회되는지 확인")
	void findLabelByMemberId(){
		//given
		Label newLabel = LabelFixture.EXERCISE_LABEL.toLabel();
		Label savedLabel = labelRepository.save(newLabel);

		//when
		List<Label> labels = labelRepository.findByMemberIdAndDeletedAtIsNull(LabelFixture.EXERCISE_LABEL.toLabel().getMemberId());

		//then
		assertThat(labels).isNotNull();
		assertThat(labels.size()).isEqualTo(1);
	}

}
