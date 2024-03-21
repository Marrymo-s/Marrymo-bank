package site.bank.restapi.auth.dto.common;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import site.bank.restapi.auth.dto.response.TokenResponse;

@Builder
@Getter
@AllArgsConstructor
public class TokenDto {
    private String accessToken;
    private String tokenType;

    public TokenResponse toResponse(){
        return TokenResponse.builder()
            .access_token(this.accessToken)
            .tokenType(this.tokenType)
            .build();
    }
}
