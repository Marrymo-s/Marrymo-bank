package site.bank.restapi.auth.dto.common;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import site.bank.restapi.auth.dto.request.ClientRequest;

@Builder
@Getter
@AllArgsConstructor
public class ClientDto {

	private String clientId;

	private String clientSecret;

	private Role clientRole;
}
