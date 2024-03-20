package site.bank.restapi.auth.dto.common;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Builder
@Getter
@AllArgsConstructor
public class TokenDto {

    private String accessToken;
    private String tokenType;

}
