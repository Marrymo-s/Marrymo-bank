package site.marrymo.restapi.global.auth.security.config;

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
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import site.marrymo.restapi.global.auth.security.handler.OAuth2LoginSuccessHandler;
import site.marrymo.restapi.global.auth.security.service.CustomOAuth2UserService;
import site.marrymo.restapi.global.jwt.JWTProvider;
import site.marrymo.restapi.global.jwt.filter.JwtAuthenticationFilter;
import site.marrymo.restapi.global.jwt.repository.RefreshTokenRepository;

@Slf4j
@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {
	private final CustomOAuth2UserService customOAuth2UserService;
	private final OAuth2LoginSuccessHandler oAuth2LoginSuccessHandler;
	private final JWTProvider jwtProvider;
	private final RefreshTokenRepository refreshTokenRepository;
	private static final String[] swaggerURL = {
		"/api/**", "/graphiql", "/graphql",
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
		http
			.formLogin(AbstractHttpConfigurer::disable)
			.httpBasic(AbstractHttpConfigurer::disable)
			.csrf(AbstractHttpConfigurer::disable)
			.sessionManagement((sessionManagement) ->
				sessionManagement.sessionCreationPolicy(SessionCreationPolicy.STATELESS));

		http
			.addFilterBefore(new JwtAuthenticationFilter(jwtProvider, refreshTokenRepository),
				UsernamePasswordAuthenticationFilter.class);

		http
			.authorizeHttpRequests(authorize -> authorize
				.requestMatchers("/h2-console/**", "/favicon.ico", "/error").permitAll()
				.requestMatchers(swaggerURL).permitAll()
				.anyRequest().permitAll());
		http
			.oauth2Login((oauth2) -> oauth2
				.successHandler(oAuth2LoginSuccessHandler)
				.userInfoEndpoint(userInfoEndpoint ->
					userInfoEndpoint.userService(customOAuth2UserService)));
		return http.build();
	}
}
