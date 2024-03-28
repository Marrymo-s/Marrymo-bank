package site.marrymo.restapi.global.security.handler;

import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import site.marrymo.restapi.global.jwt.dto.VerifyToken;
import site.marrymo.restapi.global.jwt.entity.RefreshToken;
import site.marrymo.restapi.global.jwt.JWTProvider;
import site.marrymo.restapi.global.jwt.dto.TokenDTO;

import site.marrymo.restapi.global.redis.service.RedisService;
import site.marrymo.restapi.user.entity.User;
import site.marrymo.restapi.user.exception.UserErrorCode;
import site.marrymo.restapi.user.exception.UserException;
import site.marrymo.restapi.user.repository.UserRepository;

import java.io.IOException;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

	private final JWTProvider jwtProvider;
	private final RedisService redisService;
	private final UserRepository userRepository;
	//private final String HOME_CALLBACK_URL = "https://marrymo.site/home/";
	private final String HOME_CALLBACK_URL = "http://localhost:3000/home/";
	//private final String SIGNUP_CALLBACK_URL = "https://marrymo.site/signup";
	private final String SIGNUP_CALLBACK_URL = "http://localhost:3000/signup";

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
		Authentication authentication) throws IOException {
		String kakaoId = authentication.getName();

		//받아온 kakaoId를 통해서 user 정보를 찾는다
		User user = userRepository.findByKakaoId(kakaoId)
			.orElseThrow(() -> new UserException(UserErrorCode.USER_NOT_FOUND));

		String userCode = user.getUserCode();

		VerifyToken verifyToken = generateVerifyToken(userCode);

		Cookie accessTokenCookie = new Cookie("accessToken", verifyToken.getAccessToken());
		accessTokenCookie.setMaxAge(60 * 24 * 24 * 31);
		accessTokenCookie.setPath("/");
		accessTokenCookie.setHttpOnly(true);
		accessTokenCookie.setSecure(true);
		accessTokenCookie.setDomain("marrymo.site");

		response.addCookie(accessTokenCookie);

		Cookie refreshTokenCookie = new Cookie("refreshToken", verifyToken.getRefreshToken());
		refreshTokenCookie.setMaxAge(60 * 24 * 24 * 31);
		refreshTokenCookie.setPath("/");
		refreshTokenCookie.setHttpOnly(true);
		refreshTokenCookie.setSecure(true);
		refreshTokenCookie.setDomain("marrymo.site");

		response.addCookie(refreshTokenCookie);

		String homeTargetUrl = UriComponentsBuilder.fromUriString(HOME_CALLBACK_URL + userCode).build().toUriString();
		String signupTargetUrl = UriComponentsBuilder.fromUriString(SIGNUP_CALLBACK_URL).build().toUriString();

		if (user.getCard() != null)
			getRedirectStrategy().sendRedirect(request, response, homeTargetUrl);
		else
			getRedirectStrategy().sendRedirect(request, response, signupTargetUrl);
	}

	public VerifyToken generateVerifyToken(String userCode) {
		TokenDTO accessToken = jwtProvider.createAccessToken(userCode);
		TokenDTO refreshToken = jwtProvider.createRefreshToken(userCode);

		//redis에 refresh 토큰 저장
		RefreshToken redis = new RefreshToken(refreshToken.getToken(), userCode);
		redisService.setValue(redis.getRefreshToken(), userCode);

		return VerifyToken.builder()
			.accessToken(accessToken.getToken())
			.accessTokenExpiresIn(accessToken.getExpired())
			.refreshToken(refreshToken.getToken())
			.refreshTokenExpiresIn(refreshToken.getExpired())
			.build();
	}
}
