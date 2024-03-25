package site.marrymo.restapi.global.auth.service;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import site.marrymo.restapi.global.jwt.entity.BlackList;
import site.marrymo.restapi.global.jwt.repository.BlackListRepository;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthService {
    private final BlackListRepository blackListRepository;

    public void logout(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse){
        String refreshToken = "";
        //access token, refresh token 정보를 담고 있는 cookie 모두 제거
        Cookie[] cookies = httpServletRequest.getCookies();
        for(Cookie cookie : cookies){
            if(cookie.getName().equals("refreshToken")){
                refreshToken = cookie.getValue();
            }
            cookie.setMaxAge(0);
            httpServletResponse.addCookie(cookie);
        }

        //black_list 테이블에 만료된 refresh token 정보를 저장
        blackListRepository.save(BlackList.builder().invalidRefreshToken(refreshToken).build());
    }
}
