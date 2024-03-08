package site.marrymo.restapi.global.exception;

import lombok.Getter;

@Getter
public class MarrymoException extends RuntimeException{
    private final int statusCode;
    private final String errorCode;
    private final String message;

    public MarrymoException(int statusCode, String errorCode, String message){
        this.statusCode = statusCode;
        this.errorCode = errorCode;
        this.message = message;
    }
}
