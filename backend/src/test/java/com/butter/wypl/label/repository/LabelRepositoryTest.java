package com.butter.wypl.label.repository;

import static org.assertj.core.api.Assertions.*;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.butter.wypl.global.annotation.JpaRepositoryTest;
import com.butter.wypl.label.domain.Label;
import com.butter.wypl.label.exception.LabelErrorCode;
import com.butter.wypl.label.exception.LabelException;
import com.butter.wypl.label.fixture.LabelFixture;

import jakarta.persistence.EntityManager;

@JpaRepositoryTest
public class LabelRepositoryTest {

	private final LabelRepository labelRepository;
	private final EntityManager entityManager;
	@Autowired
	public LabelRepositoryTest(LabelRepository labelRepository, EntityManager entityManager) {
		this.labelRepository = labelRepository;
		this.entityManager = entityManager;
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
	@DisplayName("수정이 제대로 되는지 확인")
	void updateLabel(){
		//given
		Label label = LabelFixture.EXERCISE_LABEL.toLabel();
		Label oldLabel = labelRepository.save(label);
		oldLabel.update("바뀐 제목", "FF0000");

		//when
		Label newLabel = labelRepository.save(oldLabel);
		entityManager.flush();
		entityManager.clear();

		//then
		assertThat(newLabel).isNotNull();
		assertThat(newLabel.getModifiedAt()).isAfter(newLabel.getCreatedAt());
		assertThat(newLabel.getDeletedAt()).isNull();
	}


	@Test
	@DisplayName("존재하는 라벨 id로 라벨이 조회되는지 확인")
	void findLabelByLabelId() {
		//given
		Label newLabel = LabelFixture.EXERCISE_LABEL.toLabel();
		Label savedLabel = labelRepository.save(newLabel);

		//when
		Optional<Label> findLabel = labelRepository.findByLabelIdAndDeletedAtIsNull(savedLabel.getLabelId());

		//then
		assertThat(findLabel).isNotNull();
		if (findLabel.isPresent()) {
			assertThat(findLabel.get().getMemberId()).isGreaterThan(0);
			assertThat(findLabel.get().getTitle()).isEqualTo(newLabel.getTitle());
			assertThat(findLabel.get().getColor()).isEqualTo(newLabel.getColor());
			assertThat(findLabel.get().getMemberId()).isEqualTo(newLabel.getMemberId());
			assertThat(findLabel.get().getCreatedAt()).isBefore(LocalDateTime.now());
			assertThat(findLabel.get().getModifiedAt()).isEqualTo(savedLabel.getCreatedAt());
			assertThat(findLabel.get().getDeletedAt()).isNull();
		}
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
