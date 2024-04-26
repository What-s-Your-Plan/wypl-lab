package com.butter.wypl.label.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter
@AllArgsConstructor
public class LabelCreateDto {

	private String title;

	private String color;
}
