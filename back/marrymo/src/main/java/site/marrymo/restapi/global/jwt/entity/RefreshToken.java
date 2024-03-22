package site.marrymo.restapi.global.jwt.entity;

import org.springframework.data.annotation.Id;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.redis.core.RedisHash;

@Getter
@NoArgsConstructor
@RedisHash(value = "refreshToken", timeToLive = 60 * 60 * 24 * 30)
public class RefreshToken {
    @Id
    private String refreshToken;
    private String userCode;

    @Builder
    public RefreshToken(String refreshToken, String userCode){
        this.refreshToken = refreshToken;
        this.userCode = userCode;
    }
}