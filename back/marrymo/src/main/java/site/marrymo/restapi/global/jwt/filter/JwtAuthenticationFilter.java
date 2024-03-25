package site.marrymo.restapi.global.jwt.filter;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.GenericFilterBean;
import site.marrymo.restapi.global.exception.UnAuthorizedException;
import site.marrymo.restapi.global.jwt.JWTProvider;
import site.marrymo.restapi.global.jwt.dto.TokenDTO;
import site.marrymo.restapi.global.jwt.entity.RefreshToken;
import site.marrymo.restapi.global.jwt.repository.RefreshTokenRepository;

import java.io.IOException;
import java.util.Map;

@Slf4j
@Component
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends GenericFilterBean {
    private final JWTProvider jwtProvider;
    private final RefreshTokenRepository refreshTokenRepository;

    /**
     * [요청 시 거치는 필터 로직]
     * Request는 아래와 같은 로직을 통과한다
     * 1. Request에서 쿠키를 가져온 후 accessToken과 refreshToken을 추출한다. (token을 토대로 userCode도 가져온다)
     * 2. jwtProvider는 유효하지 않은 토큰이 있다면 다시 생성한 후 map에 담아서 가져온다.
     * (ex) accessToken만이 유효하지 않았다면 accessToken만 map에 담아서 가져온다.
     * 3. accessToken이 유효하지 않았다면 기존에 accessToken을 담고 있던 쿠키를 삭제 시키고 다시 발급한 accessToken을 쿠키에 담는다.
     * 4. HttpServletResponse에 cookie를 담아서 보낸다.
     *
     * @param servletRequest
     * @param servletResponse
     * @param filterChain
     * @throws IOException
     * @throws ServletException
     */
    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {
        HttpServletRequest httpServletRequest = (HttpServletRequest) servletRequest;
        HttpServletResponse httpServletResponse = (HttpServletResponse) servletResponse;

        // Request에서 쿠키를 가져온 후 accessToken과 refreshToken을 추출
        Cookie[] cookies = httpServletRequest.getCookies();

        String accessToken = "";
        String refreshToken = "";
        String userCode = "";

        for(Cookie cookie : cookies){
            String tokenName = cookie.getName();
            String tokenValue = cookie.getValue();

            if(tokenName.equals("accessToken")){
                accessToken = tokenValue;

                //accessToken을 통해서 userCode를 가져온다
                userCode = jwtProvider.getUserCode(accessToken);
            } else if(tokenName.equals("refreshToken")){
                refreshToken = tokenValue;
            }
        }

        // 로그아웃 해서 만료된 refresh token을 가지고 접근 할 경우
        // exception 터뜨림
        jwtProvider.validateLogoutToken(refreshToken);

        Map<String, Object> tokens = jwtProvider.reIssueToken(accessToken, refreshToken, userCode);

        //만료된 토큰이 존재한다면
        if(tokens != null){
            Cookie accessTokenCookie = null;
            Cookie refreshTokenCookie = null;

            //access token을 보내줬다면
            //access token이 만료 되었다는 의미
            if(tokens.get("accessToken") != null){
                //기존 accessToken을 담고 있던 쿠키 제거
                removeCookie(httpServletResponse, cookies, "accessToken");

                //발급된 accessToken을 가져온다
                TokenDTO accessTokenDTO = (TokenDTO) tokens.get("accessToken");

                accessTokenCookie = new Cookie("accessToken", accessTokenDTO.getToken());

                accessTokenCookie.setMaxAge(60 * 60 * 2);
                accessTokenCookie.setPath("/");
                accessTokenCookie.setHttpOnly(true);
                accessTokenCookie.setSecure(false);
            }
            //refresh token을 보내줬다면
            //refresh token이 만료 되었다는 의미
            if(tokens.get("refreshToken") != null){
                //기존 refreshToken을 담고 있던 쿠키 제거
                removeCookie(httpServletResponse, cookies, "refreshToken");

                TokenDTO refreshTokenDTO = (TokenDTO) tokens.get("refreshToken");

                refreshTokenCookie = new Cookie("refreshToken", refreshTokenDTO.getToken());

                refreshTokenCookie.setMaxAge(60 * 24 * 24 * 31);
                refreshTokenCookie.setPath("/");
                refreshTokenCookie.setHttpOnly(true);
                refreshTokenCookie.setSecure(false);
            }

            // accessToken만 만료 되어서
            // accessToken만 재발급
            if(accessTokenCookie != null && refreshTokenCookie == null){
                httpServletResponse.addCookie(accessTokenCookie);
            }
            // refreshToken만 만료 되어서
            // refreshToken만 재발급
            else if(accessTokenCookie == null && refreshTokenCookie != null){
                httpServletResponse.addCookie(refreshTokenCookie);
                refreshTokenRepository.save(RefreshToken.builder().refreshToken(refreshTokenCookie.getValue()).build());
            }
            //accessToken, refreshToken 모두 만료 되었을 시에
            //재로그인 하라는 에러메시지를 보낸다
            else if(accessTokenCookie != null && refreshTokenCookie != null){
                throw new UnAuthorizedException();
            }
        }

        filterChain.doFilter(httpServletRequest, httpServletResponse);
    }

    //기존에 쿠키를 제거하는 로직
    public void removeCookie(HttpServletResponse httpServletResponse, Cookie[] cookies, String key){
        for(Cookie cookie : cookies){
            if(cookie.getName().equals(key)){
                cookie.setMaxAge(0);
                httpServletResponse.addCookie(cookie);
            }
        }
    }
}
