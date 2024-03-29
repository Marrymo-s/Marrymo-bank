package site.marrymo.restapi.global.redis.service;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class RedisService {
	private final RedisTemplate<String, String> redisTemplate;

	//key, value를 redis에 저장
	public void setValue(String key, String value, Long time) {
		if(this.getValue(key)!=null)
			this.deleteData(key);
		Duration expireDuration = Duration.ofSeconds(time);
		redisTemplate.opsForValue().set(key,value, expireDuration);
	}

	//key에 해당하는 값을 redis에서 검색
	public String getValue(String key) {
		return redisTemplate.opsForValue().get(key);
	}

	public void deleteData(String key){
		redisTemplate.delete(key);
	}
}
