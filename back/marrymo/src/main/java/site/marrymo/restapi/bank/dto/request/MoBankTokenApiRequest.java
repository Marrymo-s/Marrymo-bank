package site.marrymo.restapi.bank.dto.request;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MoBankTokenApiRequest {
	private String clientId;
	private String clientSecret;
}
