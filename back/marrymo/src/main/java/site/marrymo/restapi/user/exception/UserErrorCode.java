package site.marrymo.restapi.user.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import site.marrymo.restapi.global.exception.ErrorCode;

@Getter
@AllArgsConstructor
public enum UserErrorCode implements ErrorCode {
    USER_NOT_FOUNT(404, "USE_001", "찾을 수 없는 회원");

    private int statusCode;
    private String errorCode;
    private String message;
}
