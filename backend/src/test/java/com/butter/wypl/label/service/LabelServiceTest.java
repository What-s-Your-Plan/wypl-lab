package com.butter.wypl.label.service;

import static org.assertj.core.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.butter.wypl.global.annotation.ServiceTest;
import com.butter.wypl.label.domain.Label;
import com.butter.wypl.label.domain.dto.LabelCreateDto;
import com.butter.wypl.label.domain.dto.LabelUpdateDto;
import com.butter.wypl.label.exception.LabelErrorCode;
import com.butter.wypl.label.exception.LabelException;
import com.butter.wypl.label.fixture.LabelFixture;

@ServiceTest
public class LabelServiceTest {

	private final LabelServiceImpl labelService;

	@Autowired
	public LabelServiceTest(LabelServiceImpl labelService) {
		this.labelService = labelService;
	}

	@DisplayName("생성 test")
	@Nested
	class CreateTest {
		@Test
		@DisplayName("정상적인 데이터 입력시 라벨이 정상적으로 생성되는지 확인")
		void createLabel() {
			//given
			Label label = LabelFixture.STUDY_LABEL.toLabel();

			//when
			Label savedLabel = labelService.createLabel(
				label.getMemberId(),
				new LabelCreateDto(label.getTitle(), label.getColor().getColor())
			);

			//then
			assertThat(savedLabel).isNotNull();
			assertThat(savedLabel.getLabelId()).isGreaterThan(0);
			assertThat(savedLabel.getTitle()).isEqualTo(label.getTitle());
			assertThat(savedLabel.getColor().getColor()).isEqualTo(label.getColor().getColor());
			assertThat(savedLabel.getSchedules()).isEmpty();
			assertThat(savedLabel.getMemberId()).isEqualTo(label.getMemberId());
			assertThat(savedLabel.getDeletedAt()).isNull();
		}

		@Test
		@DisplayName("생성시 제목 입력이 없을시 오류 던지는지 확인")
		void createLabelTitleException() {
			//given
			Label label = LabelFixture.STUDY_LABEL.toLabel();

			//when
			//then
			assertThatThrownBy(() -> {
				labelService.createLabel(
					label.getMemberId(),
					new LabelCreateDto(null, label.getColor().getColor())
				);
			}).isInstanceOf(LabelException.class)
				.hasMessageContaining(LabelErrorCode.NOT_APPROPRIATE_TITLE.getMessage());
		}

		@Test
		@DisplayName("생성시 색상 입력이 없을 시 오류 던지는지 확인")
		void createLabelColorException() {
			//given
			Label label = LabelFixture.STUDY_LABEL.toLabel();

			//when
			//then
			assertThatThrownBy(() -> {
				labelService.createLabel(
					label.getMemberId(),
					new LabelCreateDto(label.getTitle(), null)
				);
			}).isInstanceOf(LabelException.class)
				.hasMessageContaining(LabelErrorCode.NOT_APPROPRIATE_COLOR_CODE.getMessage());
		}

		@Test
		@DisplayName("생성시 색상 입력이 잘못 됐을 시 오류 던지는지 확인")
		void createLabelColorLenException() {
			//given
			Label label = LabelFixture.STUDY_LABEL.toLabel();

			//when
			//then
			assertThatThrownBy(() -> {
				labelService.createLabel(
					label.getMemberId(),
					new LabelCreateDto(label.getTitle(), "fff")
				);
			}).isInstanceOf(LabelException.class)
				.hasMessageContaining(LabelErrorCode.NOT_APPROPRIATE_COLOR_CODE.getMessage());
		}

	}

	@DisplayName("수정 test")
	@Nested
	class UpdateTest {
		Label savedLabel;

		@BeforeEach
		void init() {
			Label label = LabelFixture.STUDY_LABEL.toLabel();
			savedLabel = labelService.createLabel(
				label.getMemberId(),
				new LabelCreateDto(label.getTitle(), label.getColor().getColor())
			);
		}

		@Test
		@DisplayName("정상적인 입력시 수정이 되는지 확인")
		void updateLabel() {
			//given
			//when
			Label updatedLabel = labelService.updateLabel(
				savedLabel.getMemberId(),
				savedLabel.getLabelId(),
				new LabelUpdateDto("바뀐 제목", "FF0000"));

			//then
			assertThat(updatedLabel.getLabelId()).isEqualTo(savedLabel.getLabelId());
			assertThat(updatedLabel.getMemberId()).isEqualTo(savedLabel.getMemberId());
			assertThat(updatedLabel.getTitle()).isEqualTo("바뀐 제목");
			assertThat(updatedLabel.getColor().getColor()).isEqualTo("FF0000");
		}

		@Test
		@DisplayName("수정 시 제목 입력이 없을시 오류 던지는지 확인")
		void updateLabelTitleException() {
			//given
			//when
			//then
			assertThatThrownBy(() -> {
				labelService.updateLabel(savedLabel.getMemberId(), savedLabel.getLabelId(),
					new LabelUpdateDto(null, "FF0000"));
			}).isInstanceOf(LabelException.class)
				.hasMessageContaining(LabelErrorCode.NOT_APPROPRIATE_TITLE.getMessage());
		}

		@Test
		@DisplayName("수정 시 색상 입력이 없을 시 오류 던지는지 확인")
		void updateLabelColorException() {
			//given
			//when
			//then
			assertThatThrownBy(() -> {
				labelService.updateLabel(
					savedLabel.getMemberId(),
					savedLabel.getLabelId(),
					new LabelUpdateDto("운동가기", null)
				);
			}).isInstanceOf(LabelException.class)
				.hasMessageContaining(LabelErrorCode.NOT_APPROPRIATE_COLOR_CODE.getMessage());
		}

		@Test
		@DisplayName("수정 시 색상 입력이 올바르지 않을 경우 오류 던지는지 확인")
		void updateLabelColorLenException() {
			//given
			//when
			//then
			assertThatThrownBy(() -> {
				labelService.updateLabel(
					savedLabel.getMemberId(),
					savedLabel.getLabelId(),
					new LabelUpdateDto("운동가기", "ff")
				);
			}).isInstanceOf(LabelException.class)
				.hasMessageContaining(LabelErrorCode.NOT_APPROPRIATE_COLOR_CODE.getMessage());
		}

		@Test
		@DisplayName("멤버 id와 라벨 id가 일치하지 않을때 에러")
		void checkValidation() {
			//given
			//when
			//then
			assertThatThrownBy(() -> {
				labelService.updateLabel(
					2,
					savedLabel.getLabelId(),
					new LabelUpdateDto("운동가기", "ff")
				);
			}).isInstanceOf(LabelException.class)
				.hasMessageContaining(LabelErrorCode.NO_PERMISSION_UPDATE.getMessage());
		}
	}

	@DisplayName("삭제 test")
	@Nested
	class DeleteTest {
		@Test
		@DisplayName("라벨 삭제가 정상 동작하는지")
		void deleteLabel() {
			//given
			Label label = LabelFixture.STUDY_LABEL.toLabel();
			label = labelService.createLabel(
				label.getMemberId(),
				new LabelCreateDto(label.getTitle(), label.getColor().getColor())
			);

			//then
			int deletedLabelId = labelService.deleteLabel(label.getLabelId(), label.getMemberId());

			//when
			assertThat(label.getLabelId()).isEqualTo(deletedLabelId);
			assertThat(label.getDeletedAt()).isNotNull();
		}
	}

	@DisplayName("라벨 id로 라벨 조회")
	@Nested
	class GetLabelByLabelId {
		@Test
		@DisplayName("라벨 id 라벨 조회가 정상적으로 동작하는지")
		void getLabel() {
			//given
			Label label = LabelFixture.STUDY_LABEL.toLabel();
			Label savedLabel = labelService.createLabel(
				label.getMemberId(),
				new LabelCreateDto(label.getTitle(), label.getColor().getColor())
			);

			//then
			//when
			assertThatCode(() -> {
				labelService.getLabelByLabelId(savedLabel.getLabelId());
			}).doesNotThrowAnyException();
		}

		@Test
		@DisplayName("라벨 id 라벨 조회 시 라벨이 없는 경우 에러를 던지는지")
		void getLabelExistException() {
			//given
			//then
			//when
			assertThatThrownBy(() -> {
				labelService.getLabelByLabelId(0);
			}).isInstanceOf(LabelException.class)
				.hasMessageContaining(LabelErrorCode.NOT_FOUND.getMessage());
		}
	}

	@DisplayName("멤버 id로 라벨 리스트 조회")
	@Nested
	class GetLabelsByMemberId {

		@Test
		@DisplayName("정상 작동 확인")
		void getLabelByMemberId() {
			//given
			Label label1 = LabelFixture.STUDY_LABEL.toLabel();
			labelService.createLabel(label1.getMemberId(),
				new LabelCreateDto(label1.getTitle(), label1.getColor().getColor()));

			Label label2 = LabelFixture.STUDY_LABEL.toLabel();
			labelService.createLabel(label2.getMemberId(),
				new LabelCreateDto(label2.getTitle(), label2.getColor().getColor()));

			//when
			List<Label> result = labelService.getLabelsByMemberId(label1.getMemberId());

			//then
			assertThat(result.size()).isEqualTo(2);
		}
	}

}
