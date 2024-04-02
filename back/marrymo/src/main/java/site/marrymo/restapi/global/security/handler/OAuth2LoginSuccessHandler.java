package site.marrymo.restapi.global.security.handler;

import java.io.IOException;

import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.SimpleUrlAuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import site.marrymo.restapi.global.jwt.JWTProvider;
import site.marrymo.restapi.global.jwt.dto.VerifyToken;
import site.marrymo.restapi.user.entity.User;
import site.marrymo.restapi.user.exception.UserErrorCode;
import site.marrymo.restapi.user.exception.UserException;
import site.marrymo.restapi.user.repository.UserRepository;

@Slf4j
@Component
@RequiredArgsConstructor
public class OAuth2LoginSuccessHandler extends SimpleUrlAuthenticationSuccessHandler {

	private final JWTProvider jwtProvider;
	private final UserRepository userRepository;
	private final String HOME_CALLBACK_URL = "https://marrymo.site/home/";
	private final String AGREEMENT_CALLBACK_URL = "https://marrymo.site/agreement";

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
		Authentication authentication) throws IOException {
		log.debug("Oauth2LoginSuccessHandler.....");
		String kakaoId = authentication.getName();

		//받아온 kakaoId를 통해서 user 정보를 찾는다
		User user = userRepository.findByKakaoId(kakaoId)
			.orElseThrow(() -> new UserException(UserErrorCode.USER_NOT_FOUND));

		String userCode = user.getUserCode();
		VerifyToken verifyToken = jwtProvider.generateVerifyToken(userCode);

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
		response.addHeader("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0");
		response.addHeader("Pragma", "no-cache");
		response.addHeader("Expires", "0");

		String homeTargetUrl = UriComponentsBuilder.fromUriString(HOME_CALLBACK_URL + userCode).build().toUriString();
		String signupTargetUrl = UriComponentsBuilder.fromUriString(AGREEMENT_CALLBACK_URL).build().toUriString();
		if (user.getCard() != null) {
			response.sendRedirect(HOME_CALLBACK_URL+userCode);
			return;
		}
		else{
			response.sendRedirect(AGREEMENT_CALLBACK_URL);
			return;
		}

		// if (user.getCard() != null)
		// 	getRedirectStrategy().sendRedirect(request, response, homeTargetUrl);
		// else
		// 	getRedirectStrategy().sendRedirect(request, response, signupTargetUrl);
	}
}
