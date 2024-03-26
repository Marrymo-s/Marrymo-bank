package site.marrymo.restapi.bank.dto.response;

import lombok.Data;

@Data
public class MoBankTokenApiResponse {
	private String access_token;
	private String tokenType;
}
