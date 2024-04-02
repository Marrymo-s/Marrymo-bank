package site.marrymo.restapi.global.security.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;

import site.marrymo.restapi.global.security.userdetails.MarrymoUserDetails;
import site.marrymo.restapi.global.jwt.JWTProvider;
import site.marrymo.restapi.global.util.UserCodeGenerator;
import site.marrymo.restapi.user.entity.User;
import site.marrymo.restapi.user.repository.UserRepository;

import java.util.Map;
import java.util.Optional;

@Slf4j
@Transactional
@RequiredArgsConstructor
@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {
	private final UserRepository userRepository;
	private final UserCodeGenerator userCodeGenerator;
	private User user;

	@Override
	public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
		OAuth2User oAuth2User = super.loadUser(userRequest);
		log.debug("CustomOAuth2UserService...");
		Map<String, Object> kakaoAccount = (Map<String, Object>)oAuth2User.getAttributes().get("kakao_account");
		String kakaoId = (String)kakaoAccount.get("email");

		log.debug("kakaoId:" + kakaoId);

		Optional<User> auth = userRepository.findByKakaoId(kakaoId);

		if (auth.isPresent()) {
			user = auth.get();
		} else {
			String userCode = userCodeGenerator.makeUserCode();
			user = User.builder().userCode(userCode).kakaoId(kakaoId).build();
			userRepository.save(user);
		}

		return new MarrymoUserDetails(user, oAuth2User.getAttributes());
	}
}