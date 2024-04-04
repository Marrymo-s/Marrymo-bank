package site.bank.restapi.auth.security;

import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import site.bank.restapi.auth.dto.common.ClientDto;
import site.bank.restapi.auth.service.AuthService;

@Slf4j
@Service
@RequiredArgsConstructor
public class PrincipalDetailsService implements UserDetailsService {

	private final AuthService authService;

	@Override
	public UserDetails loadUserByUsername(String clientId) throws UsernameNotFoundException {
		ClientDto clientDto = authService.findByClientId(clientId);
		return createUserDetails(clientDto);
	}

	public UserDetails createUserDetails(ClientDto clientDto) {
		return User.builder()
			.username(clientDto.getClientId())
			.password(clientDto.getClientSecret())
			.roles(String.valueOf(clientDto.getClientRole()))
			.build();
	}
}
