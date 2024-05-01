package com.butter.wypl.member.domain;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import com.butter.wypl.member.fixture.MemberFixture;
import com.butter.wypl.sidetab.domain.SideTab;

class SideTabTest {

	@DisplayName("SideTab 생성에 성공한다.")
	@Test
	void generateSideTab() {
		/* Given */
		Member member = MemberFixture.KIM_JEONG_UK.toMember();

		/* When */
		SideTab sideTab = SideTab.from(member);

		/* Then */
		assertAll(
				() -> assertThat(sideTab.getGoal()).isNull(),
				() -> assertThat(sideTab.getMemo()).isNull(),
				() -> assertThat(sideTab.getDDayDate()).isNull(),
				() -> assertThat(sideTab.getDDayTitle()).isNull()
		);
	}
}