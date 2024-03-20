package site.bank.restapi.auth.mapper;

import org.springframework.core.env.Environment;
import org.springframework.stereotype.Repository;

import site.bank.restapi.auth.dto.common.ClientDto;
import site.bank.restapi.auth.exception.AuthErrorCode;
import site.bank.restapi.auth.exception.AuthException;

@Repository
public class AuthMapper {
	Environment environment;

	public ClientDto findByClientId(String clientId) {
		if (clientId.equals(environment.getProperty("institution.client_id")))
			return ClientDto.builder()
				.clientId(environment.getProperty("institution.client_id"))
				.clientSecret(environment.getProperty("institution.client_secret"))
				.clientRole(environment.getProperty("institution.client_role"))
				.build();
		throw new AuthException(AuthErrorCode.INSTITUTION_NOT_FOUND);
	}

}
