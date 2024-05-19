package com.butter.wypl.schedule.respository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.butter.wypl.schedule.domain.Repetition;

public interface RepetitionRepository extends JpaRepository<Repetition, Integer> {
}
