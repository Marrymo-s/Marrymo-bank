package site.marrymo.restapi.global.entity;

import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.redis.core.RedisHash;

@Getter
@NoArgsConstructor
@RedisHash(value = "refreshToken", timeToLive = 60 * 60 * 24 * 30)
public class RefreshToken {
    @Id
    private String id;
    private String value;

    @Builder
    public RefreshToken(String id, String value){
        this.id = id;
        this.value = value;
    }
}