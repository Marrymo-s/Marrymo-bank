package site.marrymo.restapi.redis.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import site.marrymo.restapi.redis.service.RedisService;

@RequiredArgsConstructor
@RequestMapping("/redis")
@RestController
public class RedisController {
    private final RedisService redisService;
    @GetMapping("/{key}")
    public ResponseEntity<Object> getRedisKey(@PathVariable String key) {
        String value = redisService.getValue(key);
        if (value == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Key not found");
        }
        return ResponseEntity.status(HttpStatus.OK).body(value);
    }

    @PostMapping("/{key}")
    public ResponseEntity<Object> postRedisKey(@PathVariable String key, @RequestBody String value) {
        redisService.setValue(key, value);
        return ResponseEntity.status(HttpStatus.CREATED).body("Key-value pair added successfully");
    }
}
