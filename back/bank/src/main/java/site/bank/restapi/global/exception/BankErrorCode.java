package site.bank.restapi.global.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum BankErrorCode implements ErrorCode{
    INTERNAL_SERVER_ERROR(500, "INT_001", "서버에 문제가 발생했습니다");

    private final int statusCode;
    private final String errorCode;
    private final String message;
}
