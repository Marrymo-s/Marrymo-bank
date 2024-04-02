package site.marrymo.restapi.global.security.config;

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
import org.springframework.security.oauth2.client.web.OAuth2LoginAuthenticationFilter;
import org.springframework.security.web.SecurityFilterChain;

import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import site.marrymo.restapi.global.redis.service.RedisService;
import site.marrymo.restapi.global.security.handler.OAuth2LoginFailureHandler;
import site.marrymo.restapi.global.security.handler.OAuth2LoginSuccessHandler;
import site.marrymo.restapi.global.security.service.CustomOAuth2UserService;
import site.marrymo.restapi.global.jwt.JWTProvider;
import site.marrymo.restapi.global.security.filter.JwtAuthenticationFilter;

@Slf4j
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final CustomOAuth2UserService customOAuth2UserService;
    private final OAuth2LoginSuccessHandler oAuth2LoginSuccessHandler;
    private final OAuth2LoginFailureHandler oAuth2LoginFailureHandler;
    private final JWTProvider jwtProvider;
    private final RedisService redisService;
    private final CorsConfigurationSource corsConfigurationSource;
    private static final String[] swaggerURL = {
        "/graphiql", "/graphql",
        "/swagger-ui/**", "/api-docs", "/swagger-ui.html",
        "/v3/api-docs/**", "/api-docs/**", "/swagger-ui.html"
    };

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return web -> web.ignoring()
            .requestMatchers(swaggerURL)
            .requestMatchers("/error")
            .requestMatchers(PathRequest.toStaticResources().atCommonLocations()); // 정적 리소스들
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
            .csrf(AbstractHttpConfigurer::disable)
            .cors(cors -> cors.configurationSource(corsConfigurationSource));

        http
            .formLogin(AbstractHttpConfigurer::disable)
            .httpBasic(AbstractHttpConfigurer::disable)
            .sessionManagement((sessionManagement) ->
                sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

        http
            .addFilterBefore(new JwtAuthenticationFilter(jwtProvider, redisService),
                UsernamePasswordAuthenticationFilter.class);

        http
            .authorizeHttpRequests(authorize -> authorize
                .requestMatchers("/h2-console/**", "/favicon.ico", "/error").permitAll()
                .requestMatchers(swaggerURL).permitAll()
                .anyRequest().authenticated());
        http
            .oauth2Login((oauth2) -> oauth2
                .successHandler(oAuth2LoginSuccessHandler)
                .failureHandler(oAuth2LoginFailureHandler)
                .userInfoEndpoint(userInfoEndpoint ->
                    userInfoEndpoint.userService(customOAuth2UserService)));
        return http.build();
    }
}
