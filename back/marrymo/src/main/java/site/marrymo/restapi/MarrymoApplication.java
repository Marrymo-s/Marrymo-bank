package site.marrymo.restapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableScheduling
@SpringBootApplication
public class MarrymoApplication {

	public static void main(String[] args) {
		SpringApplication.run(MarrymoApplication.class, args);
	}

}
