package com.butter.wypl.label.domain;

import static org.assertj.core.api.Assertions.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import com.butter.wypl.label.exception.LabelException;
import com.butter.wypl.label.fixture.LabelFixture;

public class LabelTest {

	@Test
	@DisplayName("update 메소드가 정상 작동하는지 확인")
	void update(){
		//given
		Label oldLabel = LabelFixture.STUDY_LABEL.toLabel();

		//when
		oldLabel.update("제목 바뀜", "FF0000");

		//then
		assertThat(oldLabel.getMemberId()).isEqualTo(LabelFixture.STUDY_LABEL.toLabel().getMemberId());
		assertThat(oldLabel.getTitle()).isEqualTo("제목 바뀜");
		assertThat(oldLabel.getColor()).isEqualTo("FF0000");
	}

}
