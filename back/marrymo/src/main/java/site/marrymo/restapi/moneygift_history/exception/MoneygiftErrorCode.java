package site.marrymo.restapi.moneygift_history.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import site.marrymo.restapi.global.exception.ErrorCode;

@Getter
@AllArgsConstructor
public enum MoneygiftErrorCode implements ErrorCode {
    USER_NOT_FOUND(404, "USE_001", "찾을 수 없는 회원"),
    USER_ALREADY_EXIST(404, "USE_002", "이미 존재하는 회원입니다."),
    USER_ALREADY_DELETE(404, "USE_006", "이미 탈퇴한 회원");

    private int statusCode;
    private String errorCode;
    private String message;
}
