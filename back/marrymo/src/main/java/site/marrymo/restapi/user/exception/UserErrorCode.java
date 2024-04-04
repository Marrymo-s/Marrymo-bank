package site.marrymo.restapi.user.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import site.marrymo.restapi.global.exception.ErrorCode;

@Getter
@AllArgsConstructor
public enum UserErrorCode implements ErrorCode {
    USER_NOT_FOUND(404, "USE_001", "찾을 수 없는 회원"),
    USER_ALREADY_EXIST(404, "USE_002", "이미 존재하는 회원입니다."),
    USER_ALREADY_DELETE(404, "USE_006", "이미 탈퇴한 회원"),
    USERCODE_INCORRECT(406, "USE_007", "TOKEN에서 추출한 usercode와 파라미터로 넘어온 usercode가 불일치");

    private int statusCode;
    private String errorCode;
    private String message;
}
