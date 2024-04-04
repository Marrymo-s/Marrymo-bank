package site.marrymo.restapi.bank.dto.request;

import lombok.Builder;
import lombok.Data;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

@Data
@Builder
public class OpenBankingTokenApiRequest {
    private String code;
    private String client_id;
    private String client_secret;
    private String redirect_uri;
    private String grant_type;

    public MultiValueMap<String, String> toMultiValueMap() {
        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();

        parameters.add("code", this.code);
        parameters.add("client_id", this.client_id);
        parameters.add("client_secret", this.client_secret);
        parameters.add("redirect_uri", this.redirect_uri);
        parameters.add("grant_type", this.grant_type);

        return parameters;
    }
}
