package site.marrymo.restapi.global.security.config;

import org.springframework.boot.autoconfigure.security.servlet.PathRequest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityCustomizer;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import lombok.RequiredArgsConstructor;
import site.marrymo.restapi.global.jwt.JWTProvider;
import site.marrymo.restapi.global.redis.service.RedisService;
import site.marrymo.restapi.global.security.filter.JwtAuthenticationFilter;
import site.marrymo.restapi.global.security.handler.JwtAccessDeniedHandler;
import site.marrymo.restapi.global.security.handler.JwtAuthenticationEntryPoint;
import site.marrymo.restapi.global.security.handler.OAuth2LoginFailureHandler;
import site.marrymo.restapi.global.security.handler.OAuth2LoginSuccessHandler;
import site.marrymo.restapi.global.security.service.CustomOAuth2UserService;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity  // @Secure, @PreAuthorize, @PostAuthorize 사용가능
@RequiredArgsConstructor
public class SecurityConfig {

    private final CorsConfig corsConfig;
    private final OAuth2LoginSuccessHandler oAuth2LoginSuccessHandler;
    private final OAuth2LoginFailureHandler oAuth2LoginFailureHandler;
    private final CustomOAuth2UserService customOAuth2UserService;
    private final JWTProvider jwtProvider;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;
    private final RedisService redisService;
    private static final String[] swaggerURL = {
        "/graphiql", "/graphql",
        "/swagger-ui/**", "/api-docs", "/swagger-ui.html",
        "/v3/api-docs/**", "/api-docs/**", "/swagger-ui.html"
    };

    @Bean
    public WebSecurityCustomizer webSecurityCustomizer() {
        return web -> web.ignoring()
            .requestMatchers(swaggerURL)
            .requestMatchers(PathRequest.toStaticResources().atCommonLocations()); // 정적 리소스들
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        // 기본 세팅
        http
            .csrf(AbstractHttpConfigurer::disable)
            .cors(cors -> cors.configurationSource(corsConfig.corsConfigurationSource()));

        // JWT 토큰 인증 설정
        http
            .formLogin(AbstractHttpConfigurer::disable)
            .httpBasic(AbstractHttpConfigurer::disable)
            .sessionManagement(sessionManagement ->
                sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                        .sessionFixation().changeSessionId()
                        .maximumSessions(1))
            .addFilterBefore(new JwtAuthenticationFilter(jwtProvider, redisService),
                UsernamePasswordAuthenticationFilter.class)
           .exceptionHandling(exception -> exception
               .authenticationEntryPoint(jwtAuthenticationEntryPoint)
               .accessDeniedHandler(jwtAccessDeniedHandler))
        ;

        // URL별 권한 설정
        http
            .authorizeHttpRequests(authorize -> authorize
                .requestMatchers("/", "/css/**", "/images/**", "/js/**", "/favicon.ico", "/error").permitAll() // '인증' 무시
                .requestMatchers(swaggerURL).permitAll()
                .anyRequest().permitAll());

        //        // Oauth 로그인 설정
        http
            .oauth2Login(oauth2Login -> oauth2Login
                .successHandler(oAuth2LoginSuccessHandler)
                .failureHandler(oAuth2LoginFailureHandler)
                .userInfoEndpoint(userInfoEndpoint ->
                    userInfoEndpoint.userService(customOAuth2UserService)));

        return http.build();
    }

}