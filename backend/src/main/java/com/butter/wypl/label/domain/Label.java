package com.butter.wypl.label.domain;

import java.util.ArrayList;
import java.util.List;

import com.butter.wypl.global.common.BaseEntity;
import com.butter.wypl.label.exception.LabelErrorCode;
import com.butter.wypl.label.exception.LabelException;
import com.butter.wypl.schedule.domain.Schedule;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@AllArgsConstructor
@Builder
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Entity
public class Label extends BaseEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "label_id")
	private int labelId;

	@Column(nullable = false, length = 10)
	private String title;

	@Column(length = 6, nullable = false)
	private String color;

	@Column(name = "member_id", nullable = false)
	private int memberId;

	@OneToMany(mappedBy = "label")
	private List<Schedule> schedules = new ArrayList<>();

	public void update(String title, String color){
		this.title = title;
		this.color = color;
	}

	public static void titleValidation(String title){
		if(title == null)
			throw new LabelException(LabelErrorCode.NOT_APPROPRIATE_TITLE);
	}

	public static void colorValidation(String color){
		if(color==null || !color.matches("[0-9A-Fa-f]+") || color.length()!=6)
			throw new LabelException(LabelErrorCode.NOT_APPROPRIATE_COLOR_CODE);
	}
}
