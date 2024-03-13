package site.marrymo.restapi.user.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import site.marrymo.restapi.global.exception.ErrorCode;

@Getter
@AllArgsConstructor
public enum UserErrorCode implements ErrorCode {
    USER_NOT_FOUND(404, "USE_001", "찾을 수 없는 회원"),
    USER_ALREADY_DELETE(404, "USE_006", "탈퇴 중 에러 발생");

    private int statusCode;
    private String errorCode;
    private String message;
}
