package site.marrymo.restapi.redis.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class RedisService {
	private final RedisTemplate<String, String> redisTemplate;

	//key, value를 redis에 저장
	public void setValue(String key, String value) {
		redisTemplate.opsForValue().set(key, value);
	}

	//key에 해당하는 값을 redis에서 검색
	public String getValue(String key) {
		return redisTemplate.opsForValue().get(key);
	}
}
