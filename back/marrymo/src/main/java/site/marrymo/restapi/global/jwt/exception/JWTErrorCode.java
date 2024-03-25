package site.marrymo.restapi.global.jwt.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import site.marrymo.restapi.global.exception.ErrorCode;

@AllArgsConstructor
@Getter
public enum JWTErrorCode implements ErrorCode {
    INVALID_TOKEN(401, "JWT_001", "토큰이 유효하지 않습니다.");

    private final int StatusCode;
    private final String errorCode;
    private final String message;
}
