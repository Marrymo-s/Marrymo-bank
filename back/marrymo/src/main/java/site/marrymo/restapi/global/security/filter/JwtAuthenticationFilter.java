package site.marrymo.restapi.global.security.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.filter.OncePerRequestFilter;

import site.marrymo.restapi.global.exception.UnAuthorizedException;
import site.marrymo.restapi.global.jwt.JWTProvider;
import site.marrymo.restapi.global.redis.service.RedisService;
import site.marrymo.restapi.global.jwt.dto.TokenDTO;

import java.io.IOException;
import java.util.Map;

@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {
	private final JWTProvider jwtProvider;
	private final RedisService redisService;

	//refresh token 만료 기한 30 days
	@Value("${jwt.refresh-token.expiretime}")
	private long refreshTokenExpireTime;

	/**
	 * [요청 시 거치는 필터 로직]
	 * Request는 아래와 같은 로직을 통과한다
	 * 예외) 카카오 로그인을 할 경우나 비회원이 접근을 할 경우 쿠키에 토큰을 담아 넘겨주지 않으므로 해당 url에 대해서는 filter를 거치지 못하도록 한다.
	 * 1. Request에서 쿠키를 가져온 후 accessToken과 refreshToken을 추출한다. (token을 토대로 userCode도 가져온다)
	 *
	 * 2. 프론트에 401 에러를 보내서 로그인 창으로 리다이렉트 시키는 경우
	 * 2-1). access token과 refresh token이 각각 쿠키에 담겨서 넘어와야 하는데(쿠키 2개가 넘어와야 한다) 하나라도 없으면  401 에러을 보낸다.
	 * 2-2). 이미 로그아웃 돼서 만료된 refresh token을 가지고 접근 하려고 한다면 401 에러를 보낸다.
	 * 2-3). access token과 refresh 토큰이 모두 만료 되었을 시 401 에러를 보낸다.
	 *
	 * 3. jwtProvider는 유효하지 않은 토큰이 있다면 다시 생성한 후 map에 담아서 가져온다.
	 * (ex) accessToken만이 유효하지 않았다면 accessToken만 map에 담아서 가져온다.
	 * 4. accessToken이 유효하지 않았다면 기존에 accessToken을 담고 있던 쿠키를 삭제 시키고 다시 발급한 accessToken을 쿠키에 담는다.
	 * 5. HttpServletResponse에 cookie를 담아서 보낸다.
	 *
	 * @param httpServletRequest
	 * @param httpServletResponse
	 * @param filterChain
	 * @throws IOException
	 * @throws ServletException
	 */
	@Override
	protected void doFilterInternal(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse,
		FilterChain filterChain) throws ServletException, IOException {

		String requestURI = httpServletRequest.getRequestURI();

		log.debug("requestURI = {}", requestURI);
		if (requestURI.startsWith("/login") ||
			requestURI.equals("/moneygift/send") ||
				requestURI.equals("/smtp/send") ||
				requestURI.equals("/smtp/authcode/verifications")
		) {
			filterChain.doFilter(httpServletRequest, httpServletResponse);
			return;
		}

		String accessToken = "";
		String refreshToken = "";
		String userCode = "";

		// Request에서 쿠키를 가져온 후 accessToken과 refreshToken을 추출
		Cookie[] cookies = httpServletRequest.getCookies();
		log.debug("cookie extract.");

		// "/users/{userCode}"를 비회원이 요청하는 경우
		// cookie를 담아오지 않는다.
		if (httpServletRequest.getMethod().equals("GET") &&
			requestURI.startsWith("/users")) {
			log.debug("/users 요청 처리 중...");
			String[] split = requestURI.split("/");

			if (isNotExistAccessAndRefresh(cookies) && split.length == 3 && isContainsUserCode(split[2].trim())) {
				filterChain.doFilter(httpServletRequest, httpServletResponse);
				return;
			}
		}

		// "/wish-item/{userCode}" 또는 "/wish-item/{userCode}/{wishItemSequence}를 비회원이 요청하는 경우
		// cookie를 담아오지 않는다.
		if (requestURI.startsWith("/wish-item")) {
			log.debug("/wish-item 요청 처리 중...");
			String[] split = requestURI.split("/");

			if (isNotExistAccessAndRefresh(cookies)) {
				if (split.length > 2) {
					filterChain.doFilter(httpServletRequest, httpServletResponse);
					return;
				}
			}
		}


		//쿠키가 모두 만료되어 없거나
		//하나의 토큰만 하나의 쿠키에 담겨오는 경우
		//exception을 터뜨려 재로그인 하도록 해준다.
		if (!isExistAccessAndRefresh(cookies)) {
			removeAllCookies(httpServletResponse, cookies);
			log.debug("first exception");
			// 인증되지 않은 사용자들에게 401 에러를 던진다
			throw new UnAuthorizedException("only one token or cookie is expired.");
		}

		for (Cookie cookie : cookies) {
			String tokenName = cookie.getName();
			String tokenValue = cookie.getValue();

			if (tokenName.equals("accessToken")) {
				accessToken = tokenValue;

				userCode = jwtProvider.getUserCode(accessToken);
			} else if (tokenName.equals("refreshToken")) {
				refreshToken = tokenValue;

				userCode = jwtProvider.getUserCode(refreshToken);
			}
		}

		// 로그아웃 해서 만료된 refresh token을 가지고 접근 할 경우
		// exception 터뜨림
		if (!refreshToken.equals("") && jwtProvider.validateLogoutToken(refreshToken)) {
			removeAllCookies(httpServletResponse, cookies);
			// 인증되지 않은 사용자들에게 401 에러를 던진다
			throw new UnAuthorizedException("RefreshToken is expired.");
		}

		Map<String, Object> tokens = jwtProvider.reIssueToken(accessToken, refreshToken, userCode);

		//만료된 토큰이 존재한다면
		if (tokens != null) {
			Cookie accessTokenCookie = null;
			Cookie refreshTokenCookie = null;

			//access token을 보내줬다면
			//access token이 만료 되었다는 의미
			if (tokens.get("accessToken") != null) {
				//기존 accessToken을 담고 있던 쿠키 제거
				removeCookie(httpServletResponse, cookies, "accessToken");

				//발급된 accessToken을 가져온다
				TokenDTO accessTokenDTO = (TokenDTO)tokens.get("accessToken");

				accessTokenCookie = new Cookie("accessToken", accessTokenDTO.getToken());

				accessTokenCookie.setMaxAge(60 * 24 * 24 * 31);
				accessTokenCookie.setPath("/");
				accessTokenCookie.setHttpOnly(true);
				accessTokenCookie.setSecure(true);
				accessTokenCookie.setDomain("marrymo.site");
			}
			//refresh token을 보내줬다면
			//refresh token이 만료 되었다는 의미
			if (tokens.get("refreshToken") != null) {
				//기존 refreshToken을 담고 있던 쿠키 제거
				removeCookie(httpServletResponse, cookies, "refreshToken");

				TokenDTO refreshTokenDTO = (TokenDTO)tokens.get("refreshToken");

				refreshTokenCookie = new Cookie("refreshToken", refreshTokenDTO.getToken());

				refreshTokenCookie.setMaxAge(60 * 24 * 24 * 31);
				refreshTokenCookie.setPath("/");
				refreshTokenCookie.setHttpOnly(true);
				refreshTokenCookie.setSecure(true);
				refreshTokenCookie.setDomain("marrymo.site");
			}

			// accessToken만 만료 되어서
			// accessToken만 재발급
			if (accessTokenCookie != null && refreshTokenCookie == null) {
				httpServletResponse.addCookie(accessTokenCookie);
			}
			// refreshToken만 만료 되어서
			// refreshToken만 재발급
			else if (accessTokenCookie == null && refreshTokenCookie != null) {
				httpServletResponse.addCookie(refreshTokenCookie);
				redisService.setValue(refreshTokenCookie.getValue(), userCode, refreshTokenExpireTime);
			}
			//accessToken, refreshToken 모두 만료 되었을 시에
			//재로그인 하라는 에러메시지를 보낸다
			else if (accessTokenCookie != null && refreshTokenCookie != null) {
				// 인증되지 않은 사용자들에게 401 에러를 던진다
				throw new UnAuthorizedException("AccessToken, RefreshToken are expired.");
			}
		}

		log.debug("jwtAuthenticationFilter pass.");
		filterChain.doFilter(httpServletRequest, httpServletResponse);

	}

	//기존에 쿠키를 제거하는 로직
	public void removeCookie(HttpServletResponse httpServletResponse, Cookie[] cookies, String key) {
		if (cookies != null) {
			for (Cookie cookie : cookies) {
				if (cookie.getName().equals(key)) {
					cookie.setMaxAge(0);
					cookie.setPath("/");
					cookie.setHttpOnly(true);
					cookie.setSecure(true);
					cookie.setDomain("marrymo.site");
					httpServletResponse.addCookie(cookie);
				}
			}
		}
	}

	// accessToken, refreshToken을 담은 모든 쿠키를 제거
	public void removeAllCookies(HttpServletResponse httpServletResponse, Cookie[] cookies) {
		if (cookies != null) {
			for (Cookie cookie : cookies) {
				if(cookie.getName().equals("accessToken") || cookie.getName().equals("refreshToken")) {
					cookie.setMaxAge(0);
					cookie.setPath("/");
					cookie.setHttpOnly(true);
					cookie.setSecure(true);
					cookie.setDomain("marrymo.site");
					httpServletResponse.addCookie(cookie);
				}
			}
		}
	}

	public boolean isContainsUserCode(String userCode) {
		for (int len = 0; len < 4; len++) {
			if (!('a' <= userCode.charAt(len) && userCode.charAt(len) <= 'z'))
				return false;
		}

		for (int len = 4; len < 8; len++) {
			if (!('0' <= userCode.charAt(len) && userCode.charAt(len) <= '9'))
				return false;
		}

		return true;
	}

	public boolean isExistAccessAndRefresh(Cookie[] cookies){
		int accessTokenCnt = 0;
		int refreshTokenCnt = 0;

		if(cookies != null){
			for(Cookie cookie : cookies){
				if(cookie.getName().equals("accessToken"))
					accessTokenCnt++;
				else if(cookie.getName().equals("refreshToken"))
					refreshTokenCnt++;
			}
		}

		log.debug("accessTokenCnt="+accessTokenCnt);
		log.debug("refreshTokenCnt="+refreshTokenCnt);

		if(accessTokenCnt==1 && refreshTokenCnt==1)
			return true;
		else
			return false;
	}

	public boolean isNotExistAccessAndRefresh(Cookie[] cookies){
		int accessTokenCnt = 0;
		int refreshTokenCnt = 0;

		if(cookies != null){
			for(Cookie cookie : cookies){
				if(cookie.getName().equals("accessToken"))
					accessTokenCnt++;
				else if(cookie.getName().equals("refreshToken"))
					refreshTokenCnt++;
			}
		}

		if(accessTokenCnt==0 && refreshTokenCnt==0)
			return true;
		else
			return false;
	}
}
