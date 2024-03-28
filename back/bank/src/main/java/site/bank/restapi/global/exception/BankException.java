package site.bank.restapi.global.exception;

import lombok.Getter;

@Getter
public class BankException extends RuntimeException{
    private final int statusCode;
    private final String errorCode;
    private final String message;

    public BankException(ErrorCode errorCode){
        this.statusCode = errorCode.getStatusCode();
        this.errorCode = errorCode.getErrorCode();
        this.message = errorCode.getMessage();
    }

}
