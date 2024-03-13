package site.marrymo.restapi.open_banking.dto.request;

import lombok.Builder;

@Builder
public class TokenApiRequest {
    private String code;
    private String client_id;
    private String client_secret;
    private String redirect_uri;
    private String grant_type;
}
