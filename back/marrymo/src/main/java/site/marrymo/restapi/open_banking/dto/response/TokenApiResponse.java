package site.marrymo.restapi.open_banking.dto.response;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class TokenApiResponse {
    private String accessToken;
    private String userSeqNo;
}
