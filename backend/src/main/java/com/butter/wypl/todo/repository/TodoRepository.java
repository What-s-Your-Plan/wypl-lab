package com.butter.wypl.todo.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.butter.wypl.todo.domain.Todo;

public interface TodoRepository extends JpaRepository<Todo, Integer> {

}
