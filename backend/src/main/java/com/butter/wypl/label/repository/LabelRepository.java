package com.butter.wypl.label.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.butter.wypl.label.domain.Label;

public interface LabelRepository extends JpaRepository<Label, Integer> {
}
