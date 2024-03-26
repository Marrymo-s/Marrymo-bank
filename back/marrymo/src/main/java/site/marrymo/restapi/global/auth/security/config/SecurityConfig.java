package site.marrymo.restapi.global.auth.config;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;

import site.marrymo.restapi.global.auth.security.handler.OAuth2LoginSuccessHandler;
import site.marrymo.restapi.global.auth.security.service.CustomOAuth2UserService;

@Slf4j
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
	private final CustomOAuth2UserService customOAuth2UserService;
	private final OAuth2LoginSuccessHandler oAuth2LoginSuccessHandler;
	private static final String[] swaggerURL = {
		"/api/**", "/graphiql", "/graphql",
		"/swagger-ui/**", "/api-docs", "/swagger-ui.html",
		"/v3/api-docs/**", "/api-docs/**", "/swagger-ui.html"
	};

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception{
        http.csrf(AbstractHttpConfigurer::disable)
                .sessionManagement((sessionManagement) ->
                        sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeRequests()
                .requestMatchers("/error").permitAll()
                .requestMatchers("/h2-console/**","/favicon.ico", "/graphiql", "/graphql",
                        "/v3/api-docs/**", "/swagger-ui/**").permitAll()
                .anyRequest().permitAll()
                .and()
                .oauth2Login((oauth2) -> oauth2
                        .successHandler(oAuth2LoginSuccessHandler)
                        .userInfoEndpoint(userInfoEndpoint -> userInfoEndpoint
                                .userService(customOAuth2UserService)));
        return http.build();
    }
}
