package com.butter.wypl.todo.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.butter.wypl.member.domain.Member;
import com.butter.wypl.member.repository.MemberRepository;
import com.butter.wypl.member.utils.MemberServiceUtils;
import com.butter.wypl.todo.data.request.TodoSaveResquest;
import com.butter.wypl.todo.data.request.TodoUpdateRequest;
import com.butter.wypl.todo.data.response.TodoResponse;
import com.butter.wypl.todo.domain.Todo;
import com.butter.wypl.todo.exception.TodoErrorCode;
import com.butter.wypl.todo.exception.TodoException;
import com.butter.wypl.todo.repository.TodoRepository;
import com.butter.wypl.todo.utils.TodoServiceUtils;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TodoServiceImpl implements TodoModifyService, TodoLoadService {

	private final TodoRepository todoRepository;
	private final MemberRepository memberRepository;

	/*
	 * 1. 할일 등록
	 * 2. 할일 조회
	 * 3. 할일 수정
	 * 4. 할일 삭제
	 * 5. 할일 완료
	 * */
	@Override
	@Transactional
	public void createTodo(final TodoSaveResquest request, final int memberId) {
		Todo todo = Todo.builder()
			.member(getMember(memberId))
			.content(request.content())
			.build();
		todoRepository.save(todo);
	}

	@Override
	@Transactional
	public void updateTodo(TodoUpdateRequest request, int todoId, int memberId) {
		validationTodo(todoId, memberId)
			.updateContent(request.content());
	}

	@Override
	@Transactional
	public void deleteTodo(int todoId, int memberId) {
		validationTodo(todoId, memberId)
			.delete();
	}

	@Override
	@Transactional
	public void toggleTodo(int todoId, int memberId) {
		validationTodo(todoId, memberId)
			.toggleTodo();
	}

	@Override
	public List<TodoResponse> getTodos(int memberId) {
		Member member = getMember(memberId);
		return todoRepository.findByMemberAndDeletedAtIsNull(member).stream()
			.map(todo -> TodoResponse.of(todo, member))
			.toList();
	}

	private Todo validationTodo(int todoId, int memberId) {
		Member member = getMember(memberId);
		Todo todo = TodoServiceUtils.findById(todoRepository, todoId);

		if (member.getId() != todo.getMember().getId()) {
			throw new TodoException(TodoErrorCode.TODO_AUTHOR_DIFFERENT);
		}
		return todo;
	}

	private Member getMember(int memberId) {
		return MemberServiceUtils.findById(memberRepository, memberId);
	}

}
