package site.bank.restapi.auth.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import site.bank.restapi.auth.dto.common.ClientDto;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ClientRequest {
	private String clientId;
	private String clientSecret;
}
