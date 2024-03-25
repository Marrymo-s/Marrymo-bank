package site.marrymo.restapi.global.config;


import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {
    @Bean
    public OpenAPI openAPI() {
        Info info = new Info()
                .title("marrymo API")
                .version("1.0")
                .description("marrymo APIs");
        return new OpenAPI()
                .info(info);
    }
}

