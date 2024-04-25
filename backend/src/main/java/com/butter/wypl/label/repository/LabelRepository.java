package com.butter.wypl.label.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.butter.wypl.label.domain.Label;

public interface LabelRepository extends JpaRepository<Label, Integer> {

	Label findByLabelId(int labelId);

	List<Label> findByMemberIdAndDeletedAtIsNull(int memberId);
}
