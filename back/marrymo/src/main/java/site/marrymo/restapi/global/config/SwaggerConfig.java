package site.marrymo.restapi.global.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

@EnableWebMvc
@Configuration
public class SwaggerConfig {
	@Bean
	public OpenAPI openAPI() {
		Info info = new Info()
			.title("marrymo API")
			.version("1.0")
			.description("marrymo APIs");
		Server server = new Server();
		server.setUrl("https://spring.marrymo.site");
		return new OpenAPI()
			.info(info)
			.addServersItem(server);
	}
}

