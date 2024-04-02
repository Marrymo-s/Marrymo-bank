package site.marrymo.restapi.global.redis.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.concurrent.TimeUnit;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class RedisService {
	private final RedisTemplate<String, String> redisTemplate;

	public void setValue(String key, String value, Long time) {
		if (Boolean.TRUE.equals(redisTemplate.hasKey(key)))
			this.deleteData(key);
		redisTemplate.opsForValue().set(key, value, time, TimeUnit.MILLISECONDS);
	}

	public String getValue(String key) {
		return redisTemplate.opsForValue().get(key);
	}

	public void deleteData(String key) {
		redisTemplate.delete(key);
	}
}
