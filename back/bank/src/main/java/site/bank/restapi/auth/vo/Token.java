package site.bank.restapi.auth.vo;

import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@RedisHash(value = "accessToken")
@AllArgsConstructor
@Builder
public class Token {

    @Id
    private String userId; // key
    private String accessToken; // value

}
