package site.marrymo.restapi.global.config;

import lombok.RequiredArgsConstructor;
import site.marrymo.restapi.global.annotation.LoginUserArgumentResolver;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@Configuration
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {
    private final LoginUserArgumentResolver loginUserArgumentResolver;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
            .allowedOriginPatterns("https://marrymo.site", "http://localhost:3000")
            .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH","OPTIONS")
            .allowedHeaders("Authorization", "Content-Type")
            .exposedHeaders("*")
            .allowCredentials(true)
            .maxAge(3600);
    }
    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers){
        resolvers.add(loginUserArgumentResolver);
    }
}
