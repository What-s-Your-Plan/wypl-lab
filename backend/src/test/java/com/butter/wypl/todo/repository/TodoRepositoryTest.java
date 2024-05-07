package com.butter.wypl.todo.repository;

import static org.assertj.core.api.Assertions.*;
import static org.junit.jupiter.api.Assertions.*;

import java.time.LocalDateTime;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;

import com.butter.wypl.global.annotation.JpaRepositoryTest;
import com.butter.wypl.member.domain.Member;
import com.butter.wypl.member.fixture.MemberFixture;
import com.butter.wypl.member.repository.MemberRepository;
import com.butter.wypl.todo.domain.Todo;
import com.butter.wypl.todo.fixture.TodoFixture;

@JpaRepositoryTest
class TodoRepositoryTest {

	@Autowired
	private MemberRepository memberRepository;

	@Autowired
	private TodoRepository todoRepository;

	private Member member;

	@BeforeEach
	void init() {
		member = memberRepository.save(MemberFixture.CHOI_MIN_JUN.toMemberWithId(1));
	}

	@Test
	@DisplayName("할 일 생성")
	void createTodo () throws Exception {
	    //given
		Todo entity = Todo.builder()
			.member(member)
			.content("알고리즘 풀기")
			.build();

		//when
		Todo savedTodo = todoRepository.save(entity);

		//then
		assertThat(savedTodo).isNotNull();
		assertThat(savedTodo.isCompleted()).isFalse();
	}

	@Test
	@DisplayName("할 일 수정")
	void updateTodo () throws Exception {
	    //given
		Todo entity = TodoFixture.ALGORITHM_STUDY.toTodo();
		String preContent = entity.getContent();

		//when
		String updatedContent = "백준 말고 프로그래머스";
		entity.updateContent(updatedContent);

	    //then
		assertThat(preContent).isNotEqualTo(entity.getContent());
		assertThat(entity.getContent()).isEqualTo(updatedContent);
	}

	@Test
	@DisplayName("할 일 삭제, 논리삭제함")
	void deleteTodo () throws Exception {
	    //given
		Todo entity = TodoFixture.CS_STUDY.toTodo();
		LocalDateTime deletedAt = entity.getDeletedAt();

		//when
		entity.delete();

	    //then
		assertThat(deletedAt).isNull();
		assertThat(entity.getDeletedAt()).isNotNull();
	}

	// TODO 할 일 목록조회, 할 일 완료
}