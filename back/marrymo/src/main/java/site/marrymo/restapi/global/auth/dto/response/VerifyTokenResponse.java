package site.marrymo.restapi.global.auth.dto.response;

import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class VerifyTokenResponse {
    private String accessToken;
    private String refreshToken;
    private Long accessTokenExpiresIn;
    private Long refreshTokenExpiresIn;

    @Builder
    public VerifyTokenResponse(String accessToken, String refreshToken, Long accessTokenExpiresIn, Long refreshTokenExpiresIn){
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.accessTokenExpiresIn = accessTokenExpiresIn;
        this.refreshTokenExpiresIn = refreshTokenExpiresIn;
    }
}
