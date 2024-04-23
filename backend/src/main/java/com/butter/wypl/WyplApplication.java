package com.butter.wypl;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class WyplApplication {

	public static void main(String[] args) {
		SpringApplication.run(WyplApplication.class, args);
	}

}
