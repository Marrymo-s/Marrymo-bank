package site.bank.restapi.auth.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import site.bank.restapi.auth.dto.common.TokenDto;

@Builder
@Getter
@AllArgsConstructor
public class TokenResponse {
	private String access_token;
	private String tokenType;

}
