package com.butter.wypl.label.service;

import static org.assertj.core.api.Assertions.*;

import java.util.List;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Nested;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.butter.wypl.global.annotation.ServiceTest;
import com.butter.wypl.label.domain.Label;
import com.butter.wypl.label.domain.dto.LabelCreateDto;
import com.butter.wypl.label.domain.dto.LabelUpdateDto;
import com.butter.wypl.label.exception.LabelException;
import com.butter.wypl.label.fixture.LabelFixture;

@ServiceTest
public class LabelServiceTest {


	private final LabelService labelService;
	@Autowired
	public LabelServiceTest(LabelService labelService) {
		this.labelService = labelService;
	}

	@DisplayName("생성 test")
	@Nested
	class CreateTest{
		@Test
		@DisplayName("정상적인 데이터 입력시 라벨이 정상적으로 생성되는지 확인")
		void createLabel(){
			//given
			Label label = LabelFixture.STUDY_LABEL.toLabel();

			//when
			Label result = labelService.createLabel(
				label.getMemberId(),
				new LabelCreateDto(label.getTitle(), label.getColor())
			);

			//then
			assertThat(result).isNotNull();
			assertThat(result.getLabelId()).isGreaterThan(0);
			assertThat(result.getTitle()).isEqualTo(label.getTitle());
			assertThat(result.getColor()).isEqualTo(label.getColor());
			assertThat(result.getSchedules()).isEmpty();
			assertThat(result.getMemberId()).isEqualTo(label.getMemberId());
			assertThat(result.getDeletedAt()).isNull();
		}

		@Test
		@DisplayName("생성시 제목 입력이 없을시 오류 던지는지 확인")
		void createLabelTitleException(){
			//given
			Label label = LabelFixture.STUDY_LABEL.toLabel();

			//when
			//then
			assertThatThrownBy(()->{
				labelService.createLabel(
					label.getMemberId(),
					new LabelCreateDto(null, label.getColor())
				);
			}).isInstanceOf(LabelException.class);
		}

		@Test
		@DisplayName("생성시 색상 입력이 없을 시 오류 던지는지 확인")
		void createLabelColorException(){
			//given
			Label label = LabelFixture.STUDY_LABEL.toLabel();

			//when
			//then
			assertThatThrownBy(()->{
				labelService.createLabel(
					label.getMemberId(),
					new LabelCreateDto(label.getTitle(), null)
				);
			}).isInstanceOf(LabelException.class);
		}

		@Test
		@DisplayName("생성시 색상 입력이 잘못 됐을 시 오류 던지는지 확인")
		void createLabelColorLenException(){
			//given
			Label label = LabelFixture.STUDY_LABEL.toLabel();

			//when
			//then
			assertThatThrownBy(()->{
				labelService.createLabel(
					label.getMemberId(),
					new LabelCreateDto(label.getTitle(), "fff")
				);
			}).isInstanceOf(LabelException.class);
		}

	}

	@DisplayName("수정 test")
	@Nested
	class UpdateTest{
		@Test
		@DisplayName("정상적인 입력시 수정이 되는지 확인")
		void updateLabel(){
			//given
			Label label = LabelFixture.STUDY_LABEL.toLabel();
			Label oldLabel = labelService.createLabel(
				label.getMemberId(),
				new LabelCreateDto(label.getTitle(), label.getColor())
			);

			//when
			Label result = labelService.updateLabel(
				oldLabel.getMemberId(),
				oldLabel.getLabelId(),
				new LabelUpdateDto("바뀐 제목", "FF0000"));

			//then
			assertThat(result.getLabelId()).isEqualTo(oldLabel.getLabelId());
			assertThat(result.getMemberId()).isEqualTo(oldLabel.getMemberId());
			assertThat(result.getTitle()).isEqualTo("바뀐 제목");
			assertThat(result.getColor()).isEqualTo("FF0000");
		}

		@Test
		@DisplayName("수정 시 제목 입력이 없을시 오류 던지는지 확인")
		void updateLabelTitleException(){
			//given
			Label label = LabelFixture.STUDY_LABEL.toLabel();
			Label oldLabel = labelService.createLabel(
				label.getMemberId(),
				new LabelCreateDto(label.getTitle(), label.getColor())
			);

			//when
			//then
			assertThatThrownBy(()->{
				labelService.updateLabel(oldLabel.getMemberId(), oldLabel.getLabelId(),
					new LabelUpdateDto(null, "FF0000"));
			}).isInstanceOf(LabelException.class);
		}

		@Test
		@DisplayName("수정 시 색상 입력이 없을 시 오류 던지는지 확인")
		void updateLabelColorException(){
			//given
			Label label = LabelFixture.STUDY_LABEL.toLabel();
			Label oldLabel = labelService.createLabel(
				label.getMemberId(),
				new LabelCreateDto(label.getTitle(), label.getColor())
			);

			//when
			//then
			assertThatThrownBy(()->{
				labelService.updateLabel(
					oldLabel.getMemberId(),
					oldLabel.getLabelId(),
					new LabelUpdateDto("운동가기", null)
				);
			}).isInstanceOf(LabelException.class);
		}

		@Test
		@DisplayName("수정 시 색상 입력이 올바르지 않을 경우 오류 던지는지 확인")
		void updateLabelColorLenException(){
			//given
			Label label = LabelFixture.STUDY_LABEL.toLabel();
			Label oldLabel = labelService.createLabel(
				label.getMemberId(),
				new LabelCreateDto(label.getTitle(), label.getColor())
			);

			//when
			//then
			assertThatThrownBy(()->{
				labelService.updateLabel(
					oldLabel.getMemberId(),
					oldLabel.getLabelId(),
					new LabelUpdateDto("운동가기", "ff")
				);
			}).isInstanceOf(LabelException.class);
		}

		@Test
		@DisplayName("멤버 id와 라벨 id가 일치하지 않을때 에러")
		void checkValidation(){
			//given
			Label label = LabelFixture.STUDY_LABEL.toLabel();
			Label oldLabel = labelService.createLabel(
				label.getMemberId(),
				new LabelCreateDto(label.getTitle(), label.getColor())
			);

			//when
			//then
			assertThatThrownBy(()->{
				labelService.updateLabel(
					2,
					oldLabel.getLabelId(),
					new LabelUpdateDto("운동가기", "ff")
				);
			}).isInstanceOf(LabelException.class);
		}
	}

	@DisplayName("삭제 test")
	@Nested
	class DeleteTest{
		@Test
		@DisplayName("라벨 삭제가 정상 동작하는지")
		void deleteLabel(){
			//given
			Label label = LabelFixture.STUDY_LABEL.toLabel();
			label = labelService.createLabel(
				label.getMemberId(),
				new LabelCreateDto(label.getTitle(), label.getColor())
			);

			//then
			int deleteLabelId = labelService.deleteLabel(label.getLabelId(), label.getMemberId());

			//when
			assertThat(label.getLabelId()).isEqualTo(deleteLabelId);
			assertThat(label.getDeletedAt()).isNotNull();
		}
	}

	@DisplayName("라벨 id로 라벨 조회")
	@Nested
	class GetLabelByLabelId{
		@Test
		@DisplayName("라벨 id 라벨 조회가 정상적으로 동작하는지")
		void getLabel(){
			//given
			Label label = LabelFixture.STUDY_LABEL.toLabel();
			Label newLabel = labelService.createLabel(
				label.getMemberId(),
				new LabelCreateDto(label.getTitle(), label.getColor())
			);

			//then
			//when
			assertThatCode(()->{
				labelService.getLabelByLabelId(newLabel.getLabelId());
			}).doesNotThrowAnyException();
		}

		@Test
		@DisplayName("라벨 id 라벨 조회 시 라벨이 없는 경우 에러를 던지는지")
		void getLabelExistException(){
			//given
			//then
			//when
			assertThatThrownBy(()->{
				labelService.getLabelByLabelId(0);
			}).isInstanceOf(LabelException.class);
		}
	}

	@DisplayName("멤버 id로 라벨 리스트 조회")
	@Nested
	class GetLabelsByMemberId{

		@Test
		@DisplayName("정상 작동 확인")
		void getLabelByMemberId(){
			//given
			Label label1 = LabelFixture.STUDY_LABEL.toLabel();
			labelService.createLabel(label1.getMemberId(),
				new LabelCreateDto(label1.getTitle(), label1.getColor()));

			Label label2 = LabelFixture.STUDY_LABEL.toLabel();
			labelService.createLabel(label2.getMemberId(),
				new LabelCreateDto(label2.getTitle(), label2.getColor()));

			//when
			List<Label> result = labelService.getLabelsByMemberId(label1.getMemberId());

			//then
			assertThat(result.size()).isEqualTo(2);
		}
	}

}
