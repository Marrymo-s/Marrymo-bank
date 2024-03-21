package site.bank.restapi.auth.dto.common;

import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class TokenDto {
    private String accessToken;
    private String tokenType;

    public MultiValueMap<String, String> tokenResponse() {
        MultiValueMap<String, String> parameters = new LinkedMultiValueMap<>();
        parameters.add("access_token", this.accessToken);
        parameters.add("tokenType", this.tokenType);
        return parameters;
    }
}
