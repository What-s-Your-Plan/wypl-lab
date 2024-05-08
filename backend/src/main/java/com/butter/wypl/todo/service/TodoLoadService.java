package com.butter.wypl.todo.service;

import java.util.List;

import com.butter.wypl.todo.data.response.TodoResponse;

public interface TodoLoadService {
	List<TodoResponse> getTodos(final int memberId);
}
