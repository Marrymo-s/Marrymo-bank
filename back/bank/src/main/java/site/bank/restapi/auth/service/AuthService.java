package site.bank.restapi.auth.service;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import site.bank.restapi.auth.dto.common.ClientDto;
import site.bank.restapi.auth.dto.common.TokenDto;
import site.bank.restapi.auth.dto.request.ClientRequest;
import site.bank.restapi.auth.exception.AuthErrorCode;
import site.bank.restapi.auth.exception.AuthException;
import site.bank.restapi.auth.mapper.AuthMapper;
import site.bank.restapi.auth.provider.JwtTokenProvider;

@Slf4j
@RequiredArgsConstructor
@Service
@Transactional
public class AuthService {

	private final AuthMapper authMapper;
	private final RedisService redisService;
	private final JwtTokenProvider jwtTokenProvider;
	private final AuthenticationManagerBuilder authenticationManagerBuilder;
	private final BCryptPasswordEncoder bCryptPasswordEncoder;

	public TokenDto authenticateClient(ClientRequest client) {
		ClientDto principal = authMapper.findByClientId(client.getClientId());
		if (!bCryptPasswordEncoder.matches(client.getClientSecret(), principal.getClientSecret()))
			throw new AuthException(AuthErrorCode.INCORRECT_CLIENT_SECRET);
		UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken
			= new UsernamePasswordAuthenticationToken(client.getClientId(), client.getClientSecret());

		Authentication authentication
			= authenticationManagerBuilder.getObject().authenticate(usernamePasswordAuthenticationToken);

		SecurityContextHolder.getContext().setAuthentication(authentication);

		TokenDto token = jwtTokenProvider.generateToken(authentication);

		if (redisService.hasAccessToken(principal.getClientId())) {
			redisService.deleteAccessToken(principal.getClientId());
		}
		redisService.saveAccessToken(principal.getClientId(), token.getAccessToken());

		return token;
	}

	public ClientDto findByClientId(String clientId) {
		return authMapper.findByClientId(clientId);
	}
}
