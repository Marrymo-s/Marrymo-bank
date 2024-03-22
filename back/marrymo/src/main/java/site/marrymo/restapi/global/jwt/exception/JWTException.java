package site.marrymo.restapi.global.jwt.exception;

import site.marrymo.restapi.global.exception.ErrorCode;
import site.marrymo.restapi.global.exception.MarrymoException;

public class JWTException extends MarrymoException {
    public JWTException(ErrorCode errorCode){
        super(errorCode);
    }
}
