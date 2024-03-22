package site.bank.restapi.auth.service;

import java.util.concurrent.TimeUnit;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import site.bank.restapi.auth.provider.JwtTokenProvider;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class RedisService {

    private final RedisTemplate<String, String> accesstokenRedisTemplate;
    private final JwtTokenProvider jwtTokenProvider;

    public void saveAccessToken(String clientId, String accessToken) {
        accesstokenRedisTemplate.opsForValue()
            .set(clientId, accessToken);
    }

    public String getAccessToken(String clientId) {
        return accesstokenRedisTemplate.opsForValue().get(clientId);
    }
    public boolean hasAccessToken(String clientId){
        return Boolean.TRUE.equals(accesstokenRedisTemplate.hasKey(clientId));
    }

    public void deleteAccessToken(String clientId) {
        accesstokenRedisTemplate.delete(clientId);
    }


}
