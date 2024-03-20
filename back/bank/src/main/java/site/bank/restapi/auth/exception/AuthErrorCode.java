package site.bank.restapi.auth.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import site.bank.restapi.global.exception.ErrorCode;

@Getter
@AllArgsConstructor
public enum AuthErrorCode implements ErrorCode {
    INSTITUTION_NOT_FOUND(404, "INS_001", "등록되지 않은 이용기관"),
    INCORRECT_CLIENT_SECRET(404,"INS_002","유효하지 않은 클라이언트");

    private int statusCode;
    private String errorCode;
    private String message;
}
