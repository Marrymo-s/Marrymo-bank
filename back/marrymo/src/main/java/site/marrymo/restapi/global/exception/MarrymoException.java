package site.marrymo.restapi.global.exception;

import lombok.Getter;

@Getter
public class MarrymoException extends RuntimeException{
    private final int statusCode;
    private final String errorCode;
    private final String message;

    public MarrymoException(ErrorCode errorCode){
        this.statusCode = errorCode.getStatusCode();
        this.errorCode = errorCode.getErrorCode();
        this.message = errorCode.getMessage();
    }
}
