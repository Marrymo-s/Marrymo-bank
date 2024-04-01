package site.marrymo.restapi.global.annotation;

import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.MethodParameter;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import site.marrymo.restapi.global.jwt.JWTProvider;
import site.marrymo.restapi.global.jwt.exception.JWTErrorCode;
import site.marrymo.restapi.global.jwt.exception.JWTException;
import site.marrymo.restapi.user.dto.UserDTO;
import site.marrymo.restapi.user.entity.User;
import site.marrymo.restapi.user.repository.UserRepository;

@Slf4j
@Component
@RequiredArgsConstructor
public class LoginUserArgumentResolver implements HandlerMethodArgumentResolver {
    private final JWTProvider jwtProvider;
    private final UserRepository userRepository;

    @Override
    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.hasParameterAnnotation(LoginUser.class);
    }

    @Override
    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer, NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
        LoginUser annotation = parameter.getParameterAnnotation(LoginUser.class);
        if(annotation != null && !annotation.required()) {
            return null;
        }

        HttpServletRequest httpServletRequest = webRequest.getNativeRequest(HttpServletRequest.class);
        if(httpServletRequest != null){
            Cookie[] cookies = httpServletRequest.getCookies();
            if(cookies != null){
                for(Cookie cookie : cookies){
                    String tokenName = cookie.getName();
                    String tokenValue = cookie.getValue();

                    if(tokenName.equals("accessToken")){
                        if(tokenValue != null && !tokenValue.trim().equals("")){
                            String userCode = jwtProvider.getUserCode(tokenValue);
                            User user = userRepository.findByUserCode(userCode)
                                    .orElseThrow(() -> new JWTException(JWTErrorCode.INVALID_TOKEN));

                            return UserDTO.toDTO(user);
                        }
                    }
                }
            }
        }

        return null;
    }
}