package com.butter.wypl.label.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.butter.wypl.label.domain.Label;

public interface LabelRepository extends JpaRepository<Label, Integer> {

	Optional<Label> findByLabelIdAndDeletedAtIsNull(int labelId);

	List<Label> findByMemberIdAndDeletedAtIsNull(int memberId);
}
