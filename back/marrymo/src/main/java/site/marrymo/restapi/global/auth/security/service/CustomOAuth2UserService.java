package site.marrymo.restapi.global.auth.security.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserService;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.DefaultOAuth2User;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import site.marrymo.restapi.auth.userinfo.MarrymoUserDetails;
import site.marrymo.restapi.global.jwt.dto.VerifyToken;
import site.marrymo.restapi.global.jwt.entity.RefreshToken;
import site.marrymo.restapi.global.jwt.JWTProvider;
import site.marrymo.restapi.global.jwt.dto.TokenDTO;
import site.marrymo.restapi.global.util.UserCodeGenerator;
import site.marrymo.restapi.user.entity.User;
import site.marrymo.restapi.user.repository.UserRepository;

import java.util.Collections;
import java.util.Map;

@Slf4j
@Transactional
@RequiredArgsConstructor
@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {
    private final UserRepository userRepository;
 //   private final RefreshTokenRepository refreshTokenRepository;
    private final UserCodeGenerator userCodeGenerator;
    private final JWTProvider jwtProvider;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(userRequest);

        Map<String, Object> attributes = oAuth2User.getAttributes();
        Map<String, Object> kakaoAccount = (Map<String, Object>) attributes.get("kakao_account");

        String kakaoId = (String) kakaoAccount.get("email");
        String userCode = userCodeGenerator.makeUserCode();

        log.debug("kakaoId:"+kakaoId);
        log.debug("userCode:"+userCode);

        //메리모에 회원가입이 되어 있지 않다면
        //메리모에 회원가입 진행
        User user = User.builder().kakaoId(kakaoId).userCode(userCode).build();

        if(userRepository.findByKakaoId(kakaoId).isEmpty())
            userRepository.save(user);

        return new MarrymoUserDetails(user, oAuth2User.getAttributes());
    }
}